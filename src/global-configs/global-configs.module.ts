import { Module, ValidationPipe } from '@nestjs/common';
import { GlobalConfigsService } from './global-configs.service';
import { GlobalConfigsController } from './global-configs.controller';
import { CommonModule } from '../common/common.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [CommonModule],
  controllers: [GlobalConfigsController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
    GlobalConfigsService,
  ],
})
export class GlobalConfigsModule {}
