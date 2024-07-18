import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { GetStudentsDto } from './dto/get-students.dto';
import { Student } from '@prisma/client';
import { PaginatedResponse } from '../utils/pagination.util';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  async findAll(@Query() query: GetStudentsDto): Promise<PaginatedResponse<Student>> {
    return this.studentsService.findAll(query);
  }

  @Post()
  async create(@Body() body: CreateStudentDto): Promise<Student> {
    return this.studentsService.createStudents(body);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateStudentDto,
  ): Promise<Student> {
    return this.studentsService.updatestudent(Number(id), body);
  }
}

