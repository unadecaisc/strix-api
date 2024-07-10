import { PartialType } from '@nestjs/swagger';
import { CreateMailingListDto } from './create-mailing-list.dto';

export class UpdateMailingListDto extends PartialType(CreateMailingListDto) {}
