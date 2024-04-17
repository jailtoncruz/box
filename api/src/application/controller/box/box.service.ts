import { Injectable } from '@nestjs/common';
import { BucketService } from '../../../core/abstract/cloud/bucket-service';
import { PrismaService } from '../../../infraestructure/database/prisma/prisma.service';
import { randomFriendlyId } from '../../../core/usecase/id-generator';
import { CreateBoxDto } from './dto/create-box.dto';
import { createHash } from '../../../infraestructure/config/hash/create-hash';

@Injectable()
export class BoxService {
  constructor(
    private prisma: PrismaService,
    private bucket: BucketService,
  ) {}

  list() {
    return {};
  }

  async create({ name, description, password }: CreateBoxDto) {
    const bucket = await this.bucket.createBucket(name);
    const box = await this.prisma.box.create({
      data: {
        id: randomFriendlyId(),
        name,
        description,
        password: await createHash(password),
        bucket_id: bucket,
      },
    });
    delete box.password;
    return box;
  }
}
