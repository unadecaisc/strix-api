import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { DepartamentsService } from './departaments.service';
import { CreateDepartamentDto } from './dto/create-departament.dto';
import { UpdateDepartamentDto } from './dto/update-departament.dto';
import { GetDepartamentDto } from './dto/get-departament.dto';
import { Department } from '@prisma/client';
import { PaginatedResponse } from '../utils/pagination.util';
import { ApiTags } from '@nestjs/swagger';
import { PaginationParamsPipe } from '../pipes/pagination-params.pipe';

@ApiTags('Departments')
@Controller('departments')
export class DepartamentsController {
  constructor(private readonly departamentsService: DepartamentsService) {}

  @Get()
  async findAll(
    @Query(new PaginationParamsPipe()) query: GetDepartamentDto,
  ): Promise<PaginatedResponse<Department>> {
    return this.departamentsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Department> {
    return this.departamentsService.findOne(Number(id));
  }

  @Post()
  async create(@Body() body: CreateDepartamentDto): Promise<Department> {
    return this.departamentsService.createDepartamet(body);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateDepartamentDto,
  ): Promise<Department> {
    return this.departamentsService.updatedepartament(Number(id), body);
  }
}
