import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    origin: '*',
    methods: ['GET', 'POST', 'DELETE'],
  });
  app.use(cookieParser());
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
