import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateDepartamentDto } from './dto/create-departament.dto';
import { UpdateDepartamentDto } from './dto/update-departament.dto';
import { Department } from '@prisma/client';
import { GetDepartamentDto } from './dto/get-departament.dto';
import { PrismaService } from '../common/prisma.service';
import {
  createPaginatedResponse,
  createPaginationMetadata,
  PaginatedResponse,
} from '../utils/pagination.util';

@Injectable()
export class DepartamentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createDepartamet(data: CreateDepartamentDto): Promise<Department> {
    try {
      // Verificar la existencia de Pricing
      const pricing = await this.prismaService.pricing.findUnique({
        where: { id: data.pricingId },
      });
      if (!pricing) {
        throw new NotFoundException('Pricing not found');
      }
      return this.prismaService.department.create({
        data: {
          name: data.name,
          code: data.code,
          pricing: {
            connect: { id: data.pricingId }, // Conecta el ID de Pricing
          },
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
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
    };
    const [department, total] = await Promise.all([
      this.prismaService.department.findMany(prismaQuery),
      this.prismaService.department.count(),
    ]);
    return createPaginatedResponse<Department>(department, total, page, size);
  }

  findOne(id: number) {
    return this.prismaService.department.findFirst({
      where: {
        id,
      },
    });
  }

  async updatedepartament(
    id: number,
    data: UpdateDepartamentDto,
  ): Promise<Department> {
    try {
      // Verificar la existencia de Pricing
      if (data.pricingId) {
        const pricing = await this.prismaService.pricing.findUnique({
          where: { id: data.pricingId },
        });
        if (!pricing) {
          throw new NotFoundException('Pricing not found');
        }
      }
      return this.prismaService.department.update({
        where: {
          id,
        },
        data: {
          name: data.name,
          code: data.code,
          ...(data.pricingId && {
            pricing: {
              connect: { id: data.pricingId }, // Conecta el ID de Pricing
            },
          }),
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Could not be updated');
    }
  }

  async remove(id: number): Promise<Department> {
    try {
      return this.prismaService.department.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Could not be removed');
    }
  }
}
