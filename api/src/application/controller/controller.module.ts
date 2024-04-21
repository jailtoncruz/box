import { Module } from '@nestjs/common';
import { BoxModule } from './box/box.module';
import { DatabaseModule } from '../../infraestructure/database/database.module';
import { CloudModule } from '../../infraestructure/cloud/cloud.module';
import { ArchiveModule } from './archive/archive.module';

@Module({
  imports: [BoxModule, DatabaseModule, CloudModule, ArchiveModule],
})
export class ControllerModule {}
