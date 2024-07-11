import { Module, ValidationPipe } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { CommonModule } from '../common/common.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [CommonModule],
  controllers: [RolesController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
    RolesService,
  ],
})
export class RolesModule {}
