import { Module } from '@nestjs/common';
import { ControllerModule } from '../controller.module';
import { EnvironmentModule } from '../../../infraestructure/config/environment/environment.module';
import { SwaggerService } from '../../../infraestructure/config/swagger/swagger.service';
import { LoggerModule } from '../../../infraestructure/logger/logger.module';

@Module({
  imports: [
    ControllerModule,
    EnvironmentModule.forRoot(),
    LoggerModule.forRoot(),
  ],
  providers: [SwaggerService],
})
export class AppModule {}
