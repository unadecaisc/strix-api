import { Controller, Get, Post, Body, Param, Query, Put, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { UpdateRoleDto } from './dto/update-role.dto';
import { GetRoleDto } from './dto/get-role.dto';
import { Role } from '@prisma/client';
import { PaginatedResponse } from '../utils/pagination.util';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from './decorators/role.decorator';
import { Auth } from 'firebase-admin/lib/auth/auth';
import { BeldGuard } from '../beld/beld.guard';
import { AuthMiddleware } from '../auth/auth.middleware';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @UseGuards(BeldGuard, AuthMiddleware)
  @Roles('admin')
  async create(@Body() body: CreateRoleDto): Promise<Role> {
    return this.rolesService.createRole(body);
  }

  @Get()
  async findAll(@Query() query: GetRoleDto): Promise<PaginatedResponse<Role>> {
    return this.rolesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.updaterole(Number(id), updateRoleDto);
  }
}
