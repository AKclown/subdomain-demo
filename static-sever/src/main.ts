import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, '../../certificate/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../../certificate/cert.pem')),
  };
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    httpsOptions,
  });

  app.useStaticAssets('static', { prefix: '/pages' });

  await app.listen(5501);
}
bootstrap();
