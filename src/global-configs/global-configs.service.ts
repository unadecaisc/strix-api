import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { UpdateConfigsDto } from './dto/dto/update-configs.dto';
import { CreateGlobalConfigDto } from './dto/create-global-config.dto';

@Injectable()
export class GlobalConfigsService {
  constructor(private prismaservice: PrismaService) {}

  async getGlobalConfigs() {
    const configsArray = await this.prismaservice.globalSetting.findMany();
    const configsObject = configsArray.reduce((acc, config) => {
      acc[config.key] = config.value;
      return acc;
    }, {});
    return {
      defaultPrice: configsObject['defaultPrice'] || '',
      scolarshipCode: configsObject['scolarshipCode'] || '',
      studentsCode: configsObject['studentsCode'] || '',
      tithCode: configsObject['tithCode'] || '',
    };
  }

  async updateGlobalConfigs(updateConfigsDto: UpdateConfigsDto) {
    const updates = Object.entries(updateConfigsDto).map(([key, value]) =>
      this.prismaservice.globalSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      }),
    );
    return Promise.all(updates);
  }
}