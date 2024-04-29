import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { BucketService } from '../../../core/abstract/cloud/bucket-service';
import { PrismaService } from '../../../infraestructure/database/prisma/prisma.service';
import {
  randomBucketId,
  randomFriendlyId,
} from '../../../core/usecase/id-generator';
import { CreateBoxDto } from './dto/create-box.dto';
import { createHash } from '../../../infraestructure/config/hash/create-hash';
import { checkHash } from '../../../infraestructure/config/hash/check-hash';

@Injectable()
export class BoxService {
  constructor(
    private prisma: PrismaService,
    private bucket: BucketService,
    private logger: Logger = new Logger(BoxService.name),
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
    try {
      const bucket_id = randomBucketId();
      const bucket = await this.bucket.createBucket(bucket_id);
      const box = await this.prisma.box.create({
        data: {
          id: randomFriendlyId(),
          name,
          description,
          password: password && (await createHash(password)),
          bucket_id: bucket,
        },
      });
      delete box.password;
      return box;
    } catch (_err) {
      const err = _err as Error;
      this.logger.error(err.message);
      this.logger.error(err.stack);
      console.error(err);
      throw new BadRequestException();
    }
  }
}
