import { ApiProperty } from '@nestjs/swagger';
export class CreateRoleDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  allowedPermissions: string[];
  @ApiProperty()
  id: number;
}
