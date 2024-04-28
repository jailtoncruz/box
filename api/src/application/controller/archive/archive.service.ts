import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../infraestructure/database/prisma/prisma.service';
import { BucketService } from '../../../core/abstract/cloud/bucket-service';
import { randomShortId } from '../../../core/usecase/id-generator';
import { CreateArchiveDto } from './dto/create-archive.dto';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { sanitizeText } from '../../../core/usecase/text/sanitize-text';
import { EnvironmentService } from '../../../infraestructure/config/environment/environment.service';
import { GetReferencePathUsecase } from '../../../core/usecase/folder/get-reference-path';

@Injectable()
export class ArchiveService {
  private expireAccessInSeconds: number;
  constructor(
    private prisma: PrismaService,
    private bucketService: BucketService,
    private environmentService: EnvironmentService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private getReferencePathUsecase: GetReferencePathUsecase,
  ) {
    this.expireAccessInSeconds = Number(
      this.environmentService.get('ACCESS_EXPIRE_IN_SECONDS') ?? 60 * 60 * 8,
    );
  }

  async getById(id: string) {
    const archive = await this.prisma.archive.findUnique({
      where: { id },
    });
    if (!archive) throw new NotFoundException();
    const url = await this.getPresignedAccessUrl(
      archive.box_id,
      archive.reference_path,
    );
    return { ...archive, url };
  }

  async create(box_id: string, { name, folder_id }: CreateArchiveDto) {
    const reference_path = await this.getReferencePathUsecase.execute(
      folder_id,
      name,
    );
    const archive = await this.prisma.archive.create({
      data: {
        box_id,
        id: randomShortId(),
        name,
        folder_id,
        reference_path,
      },
    });

    const url = await this.getUploadUrl(box_id, reference_path);
    return { ...archive, url };
  }

  async delete(id: string) {
    try {
      const archive = await this.prisma.archive.delete({
        where: { id },
      });
      const bucket_id = await this.getBoxBucketId(archive.box_id);
      await this.bucketService.deleteObject(bucket_id, archive.reference_path);
    } catch (_err) {
      console.error(_err);
      throw new NotFoundException();
    }
  }

  private async getBoxBucketId(box_id: string) {
    const box = await this.prisma.box.findUnique({
      where: { id: box_id },
      select: { bucket_id: true },
    });
    if (!box) throw new NotFoundException();
    return box.bucket_id;
  }

  private async getPresignedAccessUrl(box_id: string, object: string) {
    const bucket_id = await this.getBoxBucketId(box_id);

    const key = `PRE_SIGNED_ACCESS_URL::${box_id}:${sanitizeText(object)}`;
    const cachedUrl = await this.cacheManager.get<string>(key);
    if (cachedUrl) return cachedUrl;

    const url = await this.bucketService.createPresignedGetObject({
      bucketName: bucket_id,
      object,
      expireAt: this.expireAccessInSeconds,
    });

    await this.cacheManager.set(key, url, this.expireAccessInSeconds * 1000);

    return url;
  }

  private async getUploadUrl(box_id: string, object: string): Promise<string> {
    const bucket_id = await this.getBoxBucketId(box_id);

    const url = await this.bucketService.createPresignedPutObject({
      bucketName: bucket_id,
      object,
      expireAt: 60 * 5,
    });

    return url;
  }
}
