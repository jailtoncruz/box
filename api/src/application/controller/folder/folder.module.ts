import { Module } from '@nestjs/common';
import { FolderService } from './folder.service';
import { FolderController } from './folder.controller';
import { ArchiveService } from '../archive/archive.service';
import { CacheModule } from '@nestjs/cache-manager';
import { GetReferencePathUsecase } from '../../../core/usecase/folder/get-reference-path';

@Module({
  providers: [FolderService, ArchiveService, GetReferencePathUsecase],
  controllers: [FolderController],
  imports: [CacheModule.register()],
})
export class FolderModule {}
