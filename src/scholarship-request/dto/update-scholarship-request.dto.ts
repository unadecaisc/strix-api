import { PartialType } from '@nestjs/swagger';
import { CreateScholarshipRequestDto } from './create-scholarship-request.dto';

export class UpdateScholarshipRequestDto extends PartialType(
  CreateScholarshipRequestDto,
) {}
