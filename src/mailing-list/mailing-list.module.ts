import { Module, ValidationPipe } from '@nestjs/common';
import { MailingListService } from './mailing-list.service';
import { MailingListController } from './mailing-list.controller';
import { CommonModule } from '../common/common.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [CommonModule],
  controllers: [MailingListController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
    MailingListService,
  ],
})
export class MailingListModule {}
