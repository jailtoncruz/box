import { Module } from '@nestjs/common';
import { BoxModule } from './box/box.module';
import { DatabaseModule } from '../../infraestructure/database/database.module';
import { CloudModule } from '../../infraestructure/cloud/cloud.module';

@Module({
  imports: [BoxModule, DatabaseModule, CloudModule],
})
export class ControllerModule {}
