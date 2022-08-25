import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config({ path: resolve(__dirname, '../.env') });
import { AppModule } from './app.module';
import { setupSwagger } from './util/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  setupSwagger(app);
  await app.listen(process.env.SERVER_PORT);
}

bootstrap();
