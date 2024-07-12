import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PriceService } from './price.service';
import { CreatePriceDto } from './dto/create-price.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Pricing')
@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Get()
  async findAll() {
    return this.priceService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const price = await this.priceService.getOne(Number(id));
    if (!price) {
      throw new Error('Price not found');
    }
    return price;
  }

  @Post()
  async create(@Body() createPriceDto: CreatePriceDto) {
    return this.priceService.create(createPriceDto);
  }
}