import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';
import * as session from 'express-session';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, '../../certificate/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../../certificate/cert.pem')),
  };
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    httpsOptions,
  });

  app.use(cookieParser());
  app.enableCors({
    origin: [
      'http://www.ak.com:5500',
      'https://www.ak.com:5500',
      'https://www.ak.com:5501',
      'http://sub.ak.com:5500',
      'https://sub.ak.com:5501',
      'http://sub1.ak.com:5500',
      'http://www.akclown.com:5500',
      'https://www.akclown.com:5500',
      'http://www.ak.com:3000',
      'http://api.ak.com:3000',
      'http://api.ak.com:5500',
    ],
    credentials: true,
  });

  app.useStaticAssets('static', { prefix: '/pages' });

  app.use(
    session({
      secret: 'akclwon',
      // resave 为 true 是每次访问都会更新 session，不管有没有修改 session 的内容，而 false 是只有 session 内容变了才会去更新 session。
      resave: false,
      // saveUninitalized 设置为 true 是不管是否设置 session，都会初始化一个空的 session 对象。
      saveUninitialized: false,
      // cookie: {
      //   secure: true,
      //   domain: 'api.ak.com',
      //   sameSite: 'none',
      // },
    }),
  );

  await app.listen(3000);
}
bootstrap();
