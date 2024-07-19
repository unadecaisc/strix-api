import { Module, ValidationPipe } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';
import { CommonModule } from '../common/common.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [CommonModule],
  controllers: [PriceController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
    PriceService,
  ],
})
export class PriceModule {}
