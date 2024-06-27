import { ApiProperty } from '@nestjs/swagger';
export class CreatePeriodDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  start: Date;
  @ApiProperty()
  end: Date;
}
