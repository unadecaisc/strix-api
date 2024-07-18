import { ApiProperty } from '@nestjs/swagger';
import { RequestStatus } from '@prisma/client';
import { IsNumber } from 'class-validator';
export class CreateScholarshipRequestDto {
  @ApiProperty()
  @IsNumber()
  departmentId?: number;
  @ApiProperty()
  @IsNumber()
  studentId?: number;
  @ApiProperty()
  status: RequestStatus;
}
