import { Provider } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

export const DatabaseServiceProvider: Provider = {
  provide: PrismaService,
  useClass: PrismaService,
};
