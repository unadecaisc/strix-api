import { Module, ValidationPipe } from '@nestjs/common';
import { PeriodsService } from './periods.service';
import { PeriodsController } from './periods.controller';
import { CommonModule } from '../common/common.module';
import { APP_PIPE } from '@nestjs/core';


@Module({
  imports: [CommonModule],
  controllers: [PeriodsController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
    PeriodsService,
  ],
})
export class PeriodsModule {}
