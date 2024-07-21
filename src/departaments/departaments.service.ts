import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateDepartamentDto } from './dto/create-departament.dto';
import { UpdateDepartamentDto } from './dto/update-departament.dto';
import { Department } from '@prisma/client';
import { GetDepartamentDto } from './dto/get-departament.dto';
import { PrismaService } from '../common/prisma.service';
import {
  createPaginatedResponse,
  createPaginationMetadata,
  PaginatedResponse,
} from 'src/utils/pagination.util';

@Injectable()
export class DepartamentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createDepartamet(data: CreateDepartamentDto): Promise<Department> {
    try {
      return this.prismaService.department.create({
        data: {
          name: data.name,
          code: data.code,
          pricing: data.pricing,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Could not be created');
    }
  }

  async findAll(
    query: GetDepartamentDto,
  ): Promise<PaginatedResponse<Department>> {
    const { page = 1, size = 10 } = query;
    const { take, skip } = createPaginationMetadata(page, size);
    const prismaQuery = {
      take,
      skip,
      include: {},
    };
    const [departament, total] = await Promise.all([
      this.prismaService.department.findMany(prismaQuery),
      this.prismaService.department.count(),
    ]);
    return createPaginatedResponse<Department>(departament, total, page, size);
  }

  findOne(id: number) {
    return this.prismaService.department.findFirst({
      where: {
        id,
      },
    });
  }

  updatedepartament(
    id: number,
    data: UpdateDepartamentDto,
  ): Promise<Department> {
    return this.prismaService.department.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        code: data.code,
        pricing: data.pricing,
      },
    });
  }
}
