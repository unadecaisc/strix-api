import { Module } from '@nestjs/common';
import { GlobalConfigsService } from './global-configs.service';
import { GlobalConfigsController } from './global-configs.controller';

@Module({
  controllers: [GlobalConfigsController],
  providers: [GlobalConfigsService],
})
export class GlobalConfigsModule {}
