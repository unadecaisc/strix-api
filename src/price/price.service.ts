import { Injectable } from '@nestjs/common';
import { CreatePriceDto } from './dto/create-price.dto';
import { Pricing} from '@prisma/client';
import { PrismaService } from '../common/prisma.service';






@Injectable()
export class PriceService {


  constructor( private readonly prismaService: PrismaService) {

  }  async findAll(): Promise<Pricing[]> {
      return this.prismaService.pricing.findMany();
  }

   async getOne(id: number): Promise<Pricing | null> {
    return this.prismaService.pricing.findUnique({ where: { id } });
  }

  async create(createPriceDto: CreatePriceDto): Promise<Pricing> {
    return this.prismaService.pricing.create({ data: createPriceDto });

  }
}
