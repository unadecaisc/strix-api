import { Module, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CommonModule } from '../common/common.module';
import { RolesModule } from '../roles/roles.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [CommonModule, RolesModule],
  controllers: [UsersController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
    UsersService,
  ],
})
export class UsersModule {}
