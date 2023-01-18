import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: ['http://localhost', 'http://localhost:8081', 'http://186.211.97.154:8081'],
      credentials: true,
    },
  });
  //app.useGlobalPipes(new ValidationPipe());
  await app.listen(8082);
}
bootstrap();
