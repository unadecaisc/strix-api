import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { RolesModule } from './roles/roles.module';
import { PeriodsModule } from './periods/periods.module';
import { DepartamentsModule } from './departaments/departaments.module';
import { MailingListModule } from './mailing-list/mailing-list.module';
import { GlobalConfigsModule } from './global-configs/global-configs.module';
import { PriceModule } from './price/price.module';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [
    CommonModule,
    UsersModule,
    RolesModule,
    PeriodsModule,
    DepartamentsModule,
    GlobalConfigsModule,
    MailingListModule,
    PriceModule,
    StudentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
