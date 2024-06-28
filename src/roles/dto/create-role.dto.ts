import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class CreateRoleDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  allowedPermissions: string[];
  @ApiProperty()
  id: number;
}
