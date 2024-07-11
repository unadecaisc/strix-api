import { Injectable } from '@nestjs/common';
import { CreatePriceDto } from './dto/create-price.dto';
<<<<<<< HEAD
import { Pricing } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class PriceService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll(): Promise<Pricing[]> {
    return this.prismaService.pricing.findMany();
  }

  async getOne(id: number): Promise<Pricing | null> {
=======
import { Pricing} from '@prisma/client';
import { PrismaService } from '../common/prisma.service';






@Injectable()
export class PriceService {


  constructor( private readonly prismaService: PrismaService) {

  }  async findAll(): Promise<Pricing[]> {
      return this.prismaService.pricing.findMany();
  }

   async getOne(id: number): Promise<Pricing | null> {
>>>>>>> a2e45db6ba0503d324b42864f798e828c41bc9d0
    return this.prismaService.pricing.findUnique({ where: { id } });
  }

  async create(createPriceDto: CreatePriceDto): Promise<Pricing> {
    return this.prismaService.pricing.create({ data: createPriceDto });
<<<<<<< HEAD
=======

>>>>>>> a2e45db6ba0503d324b42864f798e828c41bc9d0
  }
}
