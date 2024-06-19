import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as firebaseAdmin from 'firebase-admin';
import { config } from 'dotenv';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { getCredentialsFromEnv } from './utils';

config();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    }),
  );

  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(getCredentialsFromEnv()),
  });

  app.enableCors();

  await app.listen(process.env.PORT || 8000, '0.0.0.0');
}
bootstrap();
