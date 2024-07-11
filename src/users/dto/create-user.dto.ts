import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  email: string;
  @ApiProperty()
  @IsString()
  password: string;
  @ApiProperty()
  @IsString()
  phone: string;
  @ApiProperty()
  @IsNumber()
  roleId?: number;
  @ApiProperty()
  @IsNumber()
  departmentId?: number;
}
