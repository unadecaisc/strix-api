import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

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
  @IsOptional()
  roleId?: number;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  departmentId?: number;
}
