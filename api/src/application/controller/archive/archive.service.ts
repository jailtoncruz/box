import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../infraestructure/database/prisma/prisma.service';
import { BucketService } from '../../../core/abstract/cloud/bucket-service';
import { randomShortId } from '../../../core/usecase/id-generator';
import { CreateArchiveDto } from './dto/create-archive.dto';

@Injectable()
export class ArchiveService {
  constructor(
    private prisma: PrismaService,
    private bucketService: BucketService,
  ) {}

  async getById(id: string) {
    const archive = await this.prisma.archive.findUnique({
      where: { id },
    });
    if (!archive) throw new NotFoundException();
    const url = await this.getPresignedGet(archive.box_id, archive.name);
    return { ...archive, url };
  }

  private async getBoxBucketId(box_id: string) {
    const box = await this.prisma.box.findUnique({
      where: { id: box_id },
      select: { bucket_id: true },
    });
    if (!box) throw new NotFoundException();
    return box.bucket_id;
  }

  async getPresignedGet(box_id: string, object: string) {
    const bucket_id = await this.getBoxBucketId(box_id);

    const url = await this.bucketService.createPresignedGetObject({
      bucketName: bucket_id,
      object,
      expireAt: 60 * 60 * 8,
    });

    return url;
  }

  async getPresignedPut(box_id: string, object: string) {
    const bucket_id = await this.getBoxBucketId(box_id);

    const url = await this.bucketService.createPresignedPutObject({
      bucketName: bucket_id,
      object,
      expireAt: 60 * 5,
    });

    return url;
  }

  async create(box_id: string, { name, folder_id }: CreateArchiveDto) {
    const archive = await this.prisma.archive.create({
      data: {
        box_id,
        id: randomShortId(),
        name,
        folder_id,
      },
    });

    const url = await this.getPresignedPut(box_id, name);
    return { ...archive, url };
  }
}
