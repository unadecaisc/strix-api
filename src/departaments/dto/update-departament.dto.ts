import { PartialType } from '@nestjs/swagger';
import { CreateDepartamentDto } from './create-departament.dto';

export class UpdateDepartamentDto extends PartialType(CreateDepartamentDto) {}
