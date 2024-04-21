import { Module } from '@nestjs/common';
import { BoxController } from './box.controller';
import { BoxService } from './box.service';
import { AutheticationBoxModule } from '../../../infraestructure/config/authencation/box/authentication-box.module';

@Module({
  controllers: [BoxController],
  providers: [BoxService],
  imports: [AutheticationBoxModule],
})
export class BoxModule {}
