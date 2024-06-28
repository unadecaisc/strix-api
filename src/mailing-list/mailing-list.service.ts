import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateMailingListDto } from './dto/create-mailing-list.dto';
import { GetMailingListDto } from './dto/get-mailing-list.dto';
import { UpdateMailingListDto } from './dto/update-mailing-list.dto';
import { PrismaService } from 'src/common/prisma.service';
import { MailingList } from '@prisma/client';
import {
  PaginatedResponse,
  createPaginatedResponse,
  createPaginationMetadata,
} from 'src/utils/pagination.util';

@Injectable()
export class MailingListService {
  constructor(private readonly prismaService: PrismaService) {}

  async createMailingList(data: CreateMailingListDto): Promise<MailingList> {
    try {
      return this.prismaService.mailingList.create({
        data: {
          name: data.name,
          email: data.email,
          active: data.active,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Could not be created');
    }
  }

  async findAll(
    query: GetMailingListDto,
  ): Promise<PaginatedResponse<MailingList>> {
    const { page = 1, size = 10 } = query;
    const { take, skip } = createPaginationMetadata(page, size);
    const prismaQuery = {
      take,
      skip,
    };
    const [MailingList, total] = await Promise.all([
      this.prismaService.mailingList.findMany(prismaQuery),
      this.prismaService.mailingList.count(),
    ]);
    return createPaginatedResponse<MailingList>(MailingList, total, page, size);
  }

  findOne(id: number) {
    return this.prismaService.mailingList.findFirst({
      where: {
        id,
      },
    });
  }

  updateMailingList(
    id: number,
    data: UpdateMailingListDto,
  ): Promise<MailingList> {
    return this.prismaService.mailingList.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        email: data.email,
        active: data.active,
      },
    });
  }
}
