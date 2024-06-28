import { ApiProperty } from '@nestjs/swagger';

export class CreateMailingListDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  active: boolean;
}
