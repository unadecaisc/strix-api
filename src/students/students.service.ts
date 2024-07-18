import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from '@prisma/client';
import { GetStudentsDto } from './dto/get-students.dto';
import { PrismaService } from '../common/prisma.service';
import {
  createPaginatedResponse,
  createPaginationMetadata,
  PaginatedResponse,
} from 'src/utils/pagination.util';

@Injectable()
export class StudentsService {
  constructor(private readonly prismasService: PrismaService) {}

  async createStudents(data: CreateStudentDto): Promise<Student> {
    try {
      return this.prismasService.student.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          code: data.code,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Could not be created');
    }
  }

  async findAll(query: GetStudentsDto): Promise<PaginatedResponse<Student>> {
    const { page = 1, size = 10, search } = query;
    const { take, skip } = createPaginationMetadata(page, size);
    const prismaQuery = {
      take,
      skip,
      where: search ? {
        OR: [
          { name: { contains: search } },
          { email: { contains: search } },
          { code: { contains: search } },
        ],
      } : {},
    };
    const [student, total] = await Promise.all([
      this.prismasService.student.findMany(prismaQuery),
      this.prismasService.student.count({ where: search ? { name: { contains: search } } : {} }),
    ]);
    return createPaginatedResponse<Student>(student, total, page, size);
  }

  findOne(id: number) {
    return this.prismasService.student.findFirst({
      where: {
        id,
      },
    });
  }

  updatestudent(id: number, data: UpdateStudentDto): Promise<Student> {
    return this.prismasService.student.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        code: data.code,
      },
    });
  }
}

