import { PaginationQueryDto, } from '../../utils/pagination.util';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetPeriodDto extends PaginationQueryDto {

    page?: number;
    size?: number;
    filter?: {
      name?: {
        contains?: string;
      };
    };

    
}
