import { PaginationQueryDto } from '../../utils/pagination.util';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePeriodDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  page?: number;

  @ApiPropertyOptional()
  size?: number;

  @ApiPropertyOptional({ type: String, description: 'Filter by name' })
  search?: string;
  name: any;
  start: any;
  end: any;
}
