import { Module } from '@nestjs/common';
import { MailingListService } from './mailing-list.service';
import { MailingListController } from './mailing-list.controller';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [MailingListController],
  providers: [MailingListService],
})
export class MailingListModule {}
