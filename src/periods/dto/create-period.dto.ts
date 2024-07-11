import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';
export class CreatePeriodDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsDate()
  start: Date;
  @ApiProperty()
  @IsDate()
  end: Date;
}
