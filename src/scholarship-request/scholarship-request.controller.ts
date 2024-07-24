import { Controller, Get, Post, Body, Param, Query, Put } from '@nestjs/common';
import { ScholarshipRequestService } from './scholarship-request.service';
import { CreateScholarshipRequestDto } from './dto/create-scholarship-request.dto';
import { UpdateScholarshipRequestDto } from './dto/update-scholarship-request.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetScholarshipRequestDto } from './dto/get-scholarship-request.dto';
import { PaginationParamsPipe } from '../pipes/pagination-params.pipe';
import { PaginatedResponse } from '../utils/pagination.util';
import { StudentOnDepartment } from '@prisma/client';
@ApiTags('ScholarshipRequest')
@ApiBearerAuth()
@Controller('scholarship-request')
export class ScholarshipRequestController {
  constructor(
    private readonly scholarshipRequestService: ScholarshipRequestService,
  ) {}

  @Post()
  async create(
    @Body() createScholarshipRequestDto: CreateScholarshipRequestDto,
  ) {
    return this.scholarshipRequestService.createScholarshipRequest(
      createScholarshipRequestDto,
    );
  }

  @Get()
  async findAll(
    @Query(new PaginationParamsPipe()) query: GetScholarshipRequestDto,
  ): Promise<PaginatedResponse<StudentOnDepartment>> {
    return this.scholarshipRequestService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scholarshipRequestService.findOne(Number(id));
  }
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateScholarshipRequestDto: UpdateScholarshipRequestDto,
  ) {
    return this.scholarshipRequestService.update(
      Number(id),
      updateScholarshipRequestDto,
    );
  }
}
