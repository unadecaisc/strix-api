import { Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';

@Module({
  controllers: [PermissionsController],
  providers: [],
})
export class PermissionsModule {}
