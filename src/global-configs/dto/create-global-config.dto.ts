import { IsString } from 'class-validator';

export class CreateGlobalConfigDto {
  @IsString()
  key: string;

  @IsString()
  value: string;
}