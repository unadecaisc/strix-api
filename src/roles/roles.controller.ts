import { Controller, Get, Post, Body, Param, Query, Put } from '@nestjs/common';
import { RolesService } from './roles.service';
import { UpdateRoleDto } from './dto/update-role.dto';
import { GetRoleDto } from './dto/get-role.dto';
import { Role } from '@prisma/client';
import { PaginatedResponse } from 'src/utils/pagination.util';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async createRole(@Body() data: Role) {
    return this.rolesService.createRole(data);
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
