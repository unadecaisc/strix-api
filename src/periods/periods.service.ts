import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-Period.dto';
import { Period } from '@prisma/client';
import { GetPeriodDto } from './dto/get-Period.dto';
import { PrismaService } from 'src/common/prisma.service';
import {
  PaginatedResponse,
  createPaginatedResponse,
  createPaginationMetadata,
} from 'src/utils/pagination.util';

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
    const { page = 1, size = 10 } = query;
    const { take, skip } = createPaginationMetadata(page, size);
    const prismaQuery = {
      take,
      skip,
      include: {},
    };
    const [period, total] = await Promise.all([
      this.prismaService.period.findMany(prismaQuery),
      this.prismaService.period.count(),
    ]);
    return createPaginatedResponse<Period>(period, total, page, size);
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
