import { Controller, Get, Post, Body, Param, Query, Put } from '@nestjs/common';
import { PeriodsService } from './periods.service';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';
import { Period } from '@prisma/client';
import { PaginatedResponse } from '../utils/pagination.util';
import { ApiTags } from '@nestjs/swagger';
import { PaginationParamsPipe } from '../pipes/pagination-params.pipe';

@ApiTags('Periods')
@Controller('periods')
export class PeriodsController {
  constructor(private readonly periodsService: PeriodsService) {}

  @Get()
<<<<<<< HEAD
  async findAll(
    @Query(new PaginationParamsPipe()) query: GetPeriodDto,
  ): Promise<PaginatedResponse<Period>> {
=======
  async findAll(@Query() query: CreatePeriodDto): Promise<PaginatedResponse<Period>> {
>>>>>>> a2e45db6ba0503d324b42864f798e828c41bc9d0
    return this.periodsService.findAll(query);
  }
  

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Period> {
    return this.periodsService.findOne(Number(id));
  }

  @Post()
  async create(@Body() body: CreatePeriodDto): Promise<Period> {
    return this.periodsService.createPeriod(body);
  }

  @Put(':id')
  async update(
    @Body() body: UpdatePeriodDto,
    @Param('id') id: string,
  ): Promise<Period> {
    return this.periodsService.updatePeriod(Number(id), body);
  }
}
