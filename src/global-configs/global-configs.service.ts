// global-configs.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { UpdateConfigsDto } from './dto/update-configs.dto';
import { CreateGlobalConfigDto } from './dto/create-global-config.dto';

@Injectable()
export class GlobalConfigsService {
  constructor(private prisma: PrismaService) {}

  async getGlobalConfigs() {
    return this.prisma.globalSetting.findMany();
  }

  async updateGlobalConfigs(updateConfigsDto: UpdateConfigsDto) {
    const updates = Object.entries(updateConfigsDto).map(([key, value]) =>
      this.prisma.globalSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      }),
    );
    return Promise.all(updates);
  }
}