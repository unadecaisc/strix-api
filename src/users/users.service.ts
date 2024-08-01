import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../common/prisma.service';
import { FirebaseService } from '../common/fireabase.service';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { Prisma, User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  createPaginatedResponse,
  createPaginationMetadata,
  PaginatedResponse,
} from '../utils/pagination.util';
import { GetUsersDto } from './dto/get-users.dto';
import { RolesService } from '../roles/roles.service';

const DEFAULT_ROLE = 2;

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly firebaseService: FirebaseService,
    private readonly rolesService: RolesService,
  ) {}

  createUserInput(
    createUserDto: CreateUserDto,
    firebaseUser: UserRecord,
  ): Prisma.UserCreateInput {
    const input: Prisma.UserCreateInput = {
      email: createUserDto.email,
      name: createUserDto.name,
      phone: createUserDto.phone,
      uuid: firebaseUser.uid,
      role: {
        connect: { id: DEFAULT_ROLE },
      },
    };

    if (createUserDto.roleId) {
      input.role = {
        connect: { id: createUserDto.roleId },
      };
    }

    if (createUserDto.departmentId) {
      input.department = {
        connect: { id: createUserDto.departmentId },
      };
    }

    return input;
  }

  createUpdateUserInput(updateUser: UpdateUserDto): Prisma.UserUpdateInput {
    const input: Prisma.UserUpdateInput = {
      ...updateUser,
    };
    return input;
  }

  async create(createUserDto: CreateUserDto) {
    if (await this.exists(createUserDto.email)) {
      throw new BadRequestException('User already exists');
    }
    const role = await this.rolesService.findOne(
      createUserDto.roleId ?? DEFAULT_ROLE,
    );

    const firebaseUser = await this.firebaseService.createUser({
      email: createUserDto.email,
      password: createUserDto.password,
    });

    await this.firebaseService.addCustomClaims(firebaseUser.uid, {
      allowedPermissions: role.allowedPermissions,
      roleId: role.id,
    });

    const user = await this.prismaService.user.create({
      data: this.createUserInput(createUserDto, firebaseUser),
    });

    return user;
  }

  async findAll(query: GetUsersDto): Promise<PaginatedResponse<User>> {
    const { page = 1, size = 10, search } = query;

    const { take, skip } = createPaginationMetadata(page, size);

    const prismaQuery: Prisma.UserFindManyArgs = {
      take,
      skip,
      include: {
        role: true,
        department: true,
      },
      where: {},
    };

    if (search) {
      prismaQuery.where.OR = [
        {
          name: {
            contains: search,
            mode: 'insensitive', // Búsqueda insensible a mayúsculas/minúsculas
          },
        },
        {
          email: {
            contains: search,
            mode: 'insensitive', // Búsqueda insensible a mayúsculas/minúsculas
          },
        },
      ];
    }

    const [users, total] = await Promise.all([
      this.prismaService.user.findMany(prismaQuery),
      this.prismaService.user.count({ where: prismaQuery.where }),
    ]);

    return createPaginatedResponse<User>(users, total, page, size);
  }

  private async exists(email: string): Promise<boolean> {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          email,
        },
      });

      return !!user;
    } catch (error) {
      return false;
    }
  }
  findOne(uuid: string) {
    return this.prismaService.user.findFirst({
      where: {
        uuid,
      },
      include: {
        role: true,
        department: true,
      },
    });
  }

  async update(uuid: string, updateUserDto: UpdateUserDto): Promise<User> {
    // return `This action updates a #${id} user`;
    //update firebase

    if (updateUserDto.email || updateUserDto.password) {
      this.firebaseService.updateUser(uuid, {
        password: updateUserDto.password,
        email: updateUserDto.email,
      });
    }
    //update prisma
    const user = await this.prismaService.user.update({
      where: { uuid },
      data: this.createUpdateUserInput(updateUserDto),
    });

    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
