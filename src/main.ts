import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
app.use(cookieParser());

  // enabling validation globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        // strip unknown fields
      forbidNonWhitelisted: false,
      transform: true,        // auto-transform types (e.g., string ➝ number)
    }),
  );


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
