import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { RolesModule } from './roles/roles.module';
import { PeriodsModule } from './periods/periods.module';
import { MailingListModule } from './mailing-list/mailing-list.module';

@Module({
<<<<<<< HEAD
  imports: [
    CommonModule,
    UsersModule,
    RolesModule,
    PeriodsModule,
    MailingListModule,
  ],
=======
  imports: [CommonModule, UsersModule, RolesModule, PeriodsModule],
>>>>>>> main
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
