import { Module, ValidationPipe } from '@nestjs/common';
import { DepartamentsService } from './departaments.service';
import { DepartamentsController } from './departaments.controller';
import { CommonModule } from 'src/common/common.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [CommonModule],
  controllers: [DepartamentsController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
    DepartamentsService,
  ],
})
export class DepartamentsModule {}
