import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infraestructure/database/prisma/prisma.service';
import { BucketService } from '../../../core/abstract/cloud/bucket-service';

@Injectable()
export class ArchiveService {
  constructor(
    private prisma: PrismaService,
    private bucketService: BucketService,
  ) {}
}
