import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { RolesModule } from './roles/roles.module';
import { PeriodsModule } from './periods/periods.module';
import { MailingListModule } from './mailing-list/mailing-list.module';

@Module({

  imports: [CommonModule, UsersModule, RolesModule, PeriodsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
