import { Injectable } from '@nestjs/common';

// import { UpdateConfigsDto } from './dto/dto/update-configs.dto';
import { PrismaService } from '../common/prisma.service';
import { UpdateConfigsDto } from './dto/update-configs.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class GlobalConfigsService {
  constructor(private prismaservice: PrismaService) {}

  private updateQuery(
    key: string,
    value: string,
  ): Prisma.GlobalSettingUpsertArgs {
    return {
      where: { key },
      update: {
        key,
        value,
      },
      create: {
        key,
        value,
      },
    };
  }

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
      this.prismaservice.globalSetting.upsert(this.updateQuery(key, value)),
    );
    return Promise.all(updates);
  }
}
