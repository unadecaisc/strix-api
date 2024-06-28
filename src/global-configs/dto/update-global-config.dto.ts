import { PartialType } from '@nestjs/swagger';
import { CreateGlobalConfigDto } from './create-global-config.dto';

export class UpdateGlobalConfigDto extends PartialType(CreateGlobalConfigDto) {}
