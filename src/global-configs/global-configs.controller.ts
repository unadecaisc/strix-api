// global-configs.controller.ts
import { Controller, Get, Put, Body } from '@nestjs/common';
import { GlobalConfigsService } from './global-configs.service';
import { UpdateConfigsDto } from './dto/update-configs.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Global Configs')
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
