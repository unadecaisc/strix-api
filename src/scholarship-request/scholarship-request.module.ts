import { Module } from '@nestjs/common';
import { ScholarshipRequestService } from './scholarship-request.service';
import { ScholarshipRequestController } from './scholarship-request.controller';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [ScholarshipRequestController],
  providers: [ScholarshipRequestService],
})
export class ScholarshipRequestModule {}
