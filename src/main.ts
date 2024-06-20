import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as firebaseAdmin from 'firebase-admin';
import { config } from 'dotenv';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { getCredentialsFromEnv } from './utils';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

config();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Strix API')
    .setDescription('Api for Strix application')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(getCredentialsFromEnv()),
  });

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  await app.listen(process.env.PORT || 8000, '0.0.0.0');
}
bootstrap();
