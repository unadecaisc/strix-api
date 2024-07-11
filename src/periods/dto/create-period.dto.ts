import { IsOptional, IsString, IsDateString, IsNumber } from 'class-validator';
import { PaginationQueryDto } from '../../utils/pagination.util';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePeriodDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  size?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  start?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  end?: Date;
}
