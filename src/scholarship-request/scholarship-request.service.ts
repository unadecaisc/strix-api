import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateScholarshipRequestDto } from './dto/create-scholarship-request.dto';
import { UpdateScholarshipRequestDto } from './dto/update-scholarship-request.dto';
import { GetScholarshipRequestDto } from './dto/get-scholarship-request.dto';
import { PrismaService } from '../common/prisma.service';
import { StudentOnDepartment } from '@prisma/client';
import {
  PaginatedResponse,
  createPaginatedResponse,
  createPaginationMetadata,
} from '../utils/pagination.util';

@Injectable()
export class ScholarshipRequestService {
  constructor(private readonly prismaService: PrismaService) {}
  async createScholarshipRequest(
    data: CreateScholarshipRequestDto,
  ): Promise<StudentOnDepartment> {
    const departament = await this.prismaService.department.findUnique({
      where: {
        id: data.departmentId,
      },
    });
    if (!departament) {
      throw new BadRequestException('Department not found');
    }
    const student = await this.prismaService.student.findUnique({
      where: {
        id: data.studentId,
      },
    });
    if (!student) {
      throw new BadRequestException('Student not found');
    }

    return this.prismaService.studentOnDepartment.create({
      data: {
        status: data.status,
        department: {
          connect: {
            id: data.departmentId,
          },
        },
        student: {
          connect: {
            id: data.studentId,
          },
        },
      },
    });
  }

  async findAll(
    query: GetScholarshipRequestDto,
  ): Promise<PaginatedResponse<StudentOnDepartment>> {
    const { page = 1, size = 10 } = query;
    const { take, skip } = createPaginationMetadata(page, size);
    const prismaQuery = {
      take,
      skip,
      include: {
        department: true,
        student: true,
      },
    };
    const [studentOnDepartment, total] = await Promise.all([
      this.prismaService.studentOnDepartment.findMany(prismaQuery),
      this.prismaService.studentOnDepartment.count(),
    ]);
    return createPaginatedResponse<StudentOnDepartment>(
      studentOnDepartment,
      total,
      page,
      size,
    );
  }

  findOne(id: number) {
    return this.prismaService.studentOnDepartment.findFirst({
      where: {
        id,
      },
      include: {
        department: true,
        student: true,
      },
    });
  }

  update(
    id: number,
    data: UpdateScholarshipRequestDto,
  ): Promise<StudentOnDepartment> {
    return this.prismaService.studentOnDepartment.update({
      where: {
        id,
      },
      data: {
        status: data.status,
      },
    });
  }
}
