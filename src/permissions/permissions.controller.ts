import { Controller, Get } from '@nestjs/common';
import * as Permissions from './permissions';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Permissions')
@ApiBearerAuth()
@Controller('permissions')
export class PermissionsController {
  @Get()
  getPermissions() {
    return Object.keys(Permissions).flatMap((k) => Object.keys(Permissions[k]));
  }
}
