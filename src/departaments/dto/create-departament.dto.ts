import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartamentDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  code: string;
  @ApiProperty()
  pricing: number;
}
