import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';
import { Period } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';
import {
  PaginatedResponse,
  createPaginatedResponse,
  createPaginationMetadata,
} from '../utils/pagination.util';
import { GetPeriodDto } from './dto/get-period.dto';

@Injectable()
export class PeriodsService {
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
      throw new InternalServerErrorException('Could not be created');
    }
  }

  async findAll(query: GetPeriodDto): Promise<PaginatedResponse<Period>> {
    const { page = 1, size = 10, search } = query;
    const { take, skip } = createPaginationMetadata(page, size);
    const prismaQuery = {
      take,
      skip,
      where: search ? { name: { contains: search } } : {},
      include: {},
    };
    const [periods, total] = await Promise.all([
      this.prismaService.period.findMany(prismaQuery),
      this.prismaService.period.count({
        where: search ? { name: { contains: search } } : {},
      }),
    ]);
    return createPaginatedResponse<Period>(periods, total, page, size);
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
