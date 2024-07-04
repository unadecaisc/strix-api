import { Module } from '@nestjs/common';
import { GlobalConfigsService } from './global-configs.service';
import { GlobalConfigsController } from './global-configs.controller';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [GlobalConfigsController],
  providers: [GlobalConfigsService],
})
export class GlobalConfigsModule {}
