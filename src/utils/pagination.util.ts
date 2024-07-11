import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  size: number;
  next_page?: number | null;
  prev_page?: number | null;
};

export class PaginationQueryDto {
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  size?: number;
}

export function createPaginationMetadata(
  page: number,
  size: number,
): { take: number; skip: number } {
  return {
    take: size,
    skip: (page - 1) * size,
  };
}

export function createPaginatedResponse<T>(
  data: T[],
  total: number,
  page: number,
  size: number,
): PaginatedResponse<T> {
  const totalPages = Math.ceil(total / size);

  return {
    data,
    total,
    page,
    size,
    next_page: page < totalPages ? page + 1 : undefined,
    prev_page: page > 1 ? page - 1 : undefined,
  };
}
