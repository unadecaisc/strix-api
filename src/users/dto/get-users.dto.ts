import { ApiProperty } from '@nestjs/swagger';
import { PaginationQueryDto } from '../../utils/pagination.util';

export class GetUsersDto extends PaginationQueryDto {
  @ApiProperty({ required: false })
  search?: string;
}
