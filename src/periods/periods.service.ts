import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-Period.dto';
import { Period, PrismaClient } from '@prisma/client';
import { GetPeriodDto } from './dto/get-Period.dto';
import { PrismaService } from 'src/common/prisma.service';
import {
  PaginatedResponse,
  createPaginatedResponse,
  createPaginationMetadata,
} from 'src/utils/pagination.util';

@Injectable()
export class PeriodsService {
  create(body: CreatePeriodDto): { id: number; name: string; start: Date; end: Date; status: import(".prisma/client").$Enums.PeriodStatus; createdAt: Date; updatedAt: Date; } | PromiseLike<{ id: number; name: string; start: Date; end: Date; status: import(".prisma/client").$Enums.PeriodStatus; createdAt: Date; updatedAt: Date; }> {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly prismaService: PrismaService) {}

  async createPeriod(data: CreatePeriodDto): Promise<Period> {
    try {
      return this.prismaService.period.create({
        data: {
          name: data.name,
          start: data.start,
          end: data.end,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException("Could not be created");}
  }

  async findAll(query: GetPeriodDto): Promise<PaginatedResponse<Period>> {
    const { page = 1, size = 10 } = query;
    const { take, skip } = createPaginationMetadata(page, size);
    const prismaQuery = {
      take,
      skip,
      include: {},
    };
    const [Period, total] = await Promise.all([
      this.prismaService.period.findMany(prismaQuery),
      this.prismaService.period.count(),
    ]);
    return createPaginatedResponse<Period>(Period, total, page, size);
  }

  findOne(id: number) {
    return this.prismaService.period.findFirst({
      where: {
        id,
      },
    });
  }

  updatePeriod(id: number, data: UpdatePeriodDto): Promise<Period> {
    return this.prismaService.period.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        start: data.start,
        end: data.end,
      },
    });
  }
}
