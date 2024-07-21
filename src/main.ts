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
import fastifyCors, { FastifyCorsOptions } from '@fastify/cors';

config();

async function bootstrap() {
  const adapter = new FastifyAdapter();

  const corsOptios: FastifyCorsOptions = {
    origin: process.env.CORS_ORIGIN ?? true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
  };
  await adapter.register(fastifyCors as any, corsOptios);

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
  );
  const config = new DocumentBuilder()
    .setTitle('Strix API')
    .setDescription('Api for Strix application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('doc', app, document);

  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(getCredentialsFromEnv()),
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 8000, '0.0.0.0');
}
bootstrap();
