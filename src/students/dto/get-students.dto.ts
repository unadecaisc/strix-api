import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/utils/pagination.util';
import { IsOptional, IsString } from 'class-validator';
export class GetStudentsDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  search?: string;
}
