import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaClient, Role } from '@prisma/client';
import { GetRoleDto } from './dto/get-role.dto';
import { PrismaService } from 'src/common/prisma.service';
import { GetUsersDto } from 'src/users/dto/get-users.dto';
import {
  PaginatedResponse,
  createPaginatedResponse,
  createPaginationMetadata,
} from 'src/utils/pagination.util';

@Injectable()
export class RolesService {
  create(createRoleDto: CreateRoleDto) {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly prismaService: PrismaService) {}

  async createRole(data: CreateRoleDto): Promise<Role> {
    try {
      return this.prismaService.role.create({
        data: {
          name: data.name,
          allowedPermissions: data.allowedPermissions,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException("Could not be created");}
  }

  async findAll(query: GetRoleDto): Promise<PaginatedResponse<Role>> {
    const { page = 1, size = 10 } = query;
    const { take, skip } = createPaginationMetadata(page, size);
    const prismaQuery = {
      take,
      skip,
      include: {},
    };
    const [Role, total] = await Promise.all([
      this.prismaService.role.findMany(prismaQuery),
      this.prismaService.role.count(),
    ]);
    return createPaginatedResponse<Role>(Role, total, page, size);
  }

  findOne(id: number) {
    return this.prismaService.role.findFirst({
      where: {
        id,
      },
      include: {},
    });
  }

  updaterole(id: number, data: UpdateRoleDto): Promise<Role> {
    return this.prismaService.role.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        allowedPermissions: data.allowedPermissions,
      },
    });
  }
}
