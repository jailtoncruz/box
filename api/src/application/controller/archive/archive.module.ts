import { Module } from '@nestjs/common';
import { ArchiveService } from './archive.service';
import { ArchiveController } from './archive.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { GetReferencePathUsecase } from '../../../core/usecase/folder/get-reference-path';

@Module({
  providers: [ArchiveService, GetReferencePathUsecase],
  controllers: [ArchiveController],
  imports: [CacheModule.register()],
})
export class ArchiveModule {}
