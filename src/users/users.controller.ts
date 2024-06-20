import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginatedResponse } from '../utils/pagination.util';
import { GetUsersDto } from './dto/get-users.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Query() query: GetUsersDto): Promise<PaginatedResponse<User>> {
    return this.usersService.findAll(query);
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string): Promise<User> {
    return this.usersService.findOne(uuid);
  }

  @Post()
  async create(@Body() body: CreateUserDto): Promise<User> {
    return this.usersService.create(body);
  }

  @Put(':uuid')
  async update(
    @Body() body: UpdateUserDto,
    @Param('uuid') uuid: string,
  ): Promise<User> {
    return this.usersService.update(uuid, body);
  }
}
