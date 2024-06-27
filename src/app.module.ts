import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { RolesModule } from './roles/roles.module';
import { PeriodsModule } from './periods/periods.module';
import { GlobalConfigsModule } from './global-configs/global-configs.module';

@Module({
  imports: [CommonModule, UsersModule, RolesModule, PeriodsModule, GlobalConfigsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
