import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
export class CreateRoleDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsArray({
    each: true,
  })
  allowedPermissions: string[];
}
