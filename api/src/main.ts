import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './application/controller/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { EnvironmentService } from './infraestructure/config/environment/environment.service';
import { SwaggerService } from './infraestructure/config/swagger/swagger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const environmentService = app.get(EnvironmentService);
  app.setGlobalPrefix('api');
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.get(SwaggerService).init(app);
  app.enableCors({
    origin: environmentService.isProduction()
      ? environmentService.getOrThrow('PRODUCTION_ORIGIN')
      : '*',
  });
  await app.listen(environmentService.getServerPort());
}
bootstrap();
