import { Module } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';
import { CommonModule } from '../common/common.module';



@Module({
  imports: [ CommonModule],
  controllers: [PriceController],
  providers: [PriceService],

  
})
export class PriceModule {}
