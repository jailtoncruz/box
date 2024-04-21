import { Injectable, NotFoundException } from '@nestjs/common';
import { BucketService } from '../../../core/abstract/cloud/bucket-service';
import { PrismaService } from '../../../infraestructure/database/prisma/prisma.service';
import {
  randomBucketId,
  randomFriendlyId,
  randomShortId,
} from '../../../core/usecase/id-generator';
import { CreateBoxDto } from './dto/create-box.dto';
import { createHash } from '../../../infraestructure/config/hash/create-hash';
import { checkHash } from '../../../infraestructure/config/hash/check-hash';

@Injectable()
export class BoxService {
  constructor(
    private prisma: PrismaService,
    private bucket: BucketService,
  ) {}

  async getById(id: string, password?: string) {
    const box = await this.prisma.box.findUnique({
      where: {
        id,
      },
    });

    if (
      !box ||
      (box.password && !(await checkHash(password ?? '', box.password)))
    )
      throw new NotFoundException();

    delete box.password;
    return box;
  }

  async create({ name, description, password }: CreateBoxDto) {
    const bucket_id = randomBucketId();
    const bucket = await this.bucket.createBucket(bucket_id);
    const box = await this.prisma.box.create({
      data: {
        id: randomFriendlyId(),
        name,
        description,
        password: password && (await createHash(password)),
        bucket_id: bucket,
        root_folder: {
          create: {
            id: randomShortId(),
            name: '/',
          },
        },
      },
    });
    delete box.password;
    return box;
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

    const preSigned = await this.bucket.createPresignedGetObject({
      bucketName: bucket_id,
      object,
      expireAt: 60 * 60 * 8,
    });

    return { url: preSigned };
  }

  async getPresignedPut(box_id: string, object: string) {
    const bucket_id = await this.getBoxBucketId(box_id);

    const preSigned = await this.bucket.createPresignedPutObject({
      bucketName: bucket_id,
      object,
      expireAt: 60 * 60 * 8,
    });

    return { url: preSigned };
  }

  async getAuthToken() {}
}
