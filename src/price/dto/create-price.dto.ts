import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class CreatePriceDto {
  @ApiProperty()
  @IsBoolean()
  active: boolean;
  @ApiProperty()
  @IsBoolean()
  price: number;
}
