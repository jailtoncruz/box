import { Module } from '@nestjs/common';
import { ArchiveService } from './archive.service';
import { ArchiveController } from './archive.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  providers: [ArchiveService],
  controllers: [ArchiveController],
  imports: [CacheModule.register()],
})
export class ArchiveModule {}
