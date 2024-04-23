import { Module } from '@nestjs/common';
import { BoxModule } from './box/box.module';
import { DatabaseModule } from '../../infraestructure/database/database.module';
import { CloudModule } from '../../infraestructure/cloud/cloud.module';
import { ArchiveModule } from './archive/archive.module';
import { RouterModule } from '@nestjs/core';
import { FolderModule } from './folder/folder.module';

@Module({
  imports: [
    BoxModule,
    DatabaseModule,
    CloudModule,
    ArchiveModule,
    FolderModule,
    RouterModule.register([
      {
        path: 'box',
        module: BoxModule,
        children: [
          {
            path: ':box_id/folder',
            module: FolderModule,
          },
          {
            path: ':box_id/archive',
            module: ArchiveModule,
          },
        ],
      },
    ]),
  ],
})
export class ControllerModule {}
