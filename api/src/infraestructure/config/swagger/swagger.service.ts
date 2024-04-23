import { Injectable } from '@nestjs/common';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

@Injectable()
export class SwaggerService {
  constructor() {}

  init(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('Box of Everything')
      .setDescription('Keep and share your files easily.')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('Box', 'Group of endpoints to manage your boxes.')
      .addTag('Archive', 'Group of endpoints to manage your archives.')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/swagger', app, document);
  }
}
