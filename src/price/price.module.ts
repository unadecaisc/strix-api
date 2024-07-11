import { Module } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';
import { CommonModule } from '../common/common.module';

<<<<<<< HEAD
@Module({
  imports: [CommonModule],
  controllers: [PriceController],
  providers: [PriceService],
=======


@Module({
  imports: [ CommonModule],
  controllers: [PriceController],
  providers: [PriceService],

  
>>>>>>> a2e45db6ba0503d324b42864f798e828c41bc9d0
})
export class PriceModule {}
