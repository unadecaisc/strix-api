// global-configs.controller.ts
import { Controller, Get, Put, Body, Post } from '@nestjs/common';
import { GlobalConfigsService } from './global-configs.service';
import { UpdateConfigsDto } from './dto/dto/update-configs.dto';
import { CreateGlobalConfigDto } from './dto/create-global-config.dto';

@Controller('global-configs')
export class GlobalConfigsController {
  constructor(private readonly globalConfigsService: GlobalConfigsService) {}

  @Get()
  async getGlobalConfigs() {
    return this.globalConfigsService.getGlobalConfigs();
  }

  @Put()
  async updateGlobalConfigs(@Body() updateConfigsDto: UpdateConfigsDto) {
    return this.globalConfigsService.updateGlobalConfigs(updateConfigsDto);
  }
}
