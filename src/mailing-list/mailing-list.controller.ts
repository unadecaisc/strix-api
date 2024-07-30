import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Query,
  Delete,
} from '@nestjs/common';
import { MailingListService } from './mailing-list.service';
import { GetMailingListDto } from './dto/get-mailing-list.dto';
import { CreateMailingListDto } from './dto/create-mailing-list.dto';
import { UpdateMailingListDto } from './dto/update-mailing-list.dto';
import { PaginatedResponse } from '../utils/pagination.util';
import { MailingList } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationParamsPipe } from '../pipes/pagination-params.pipe';

@ApiTags('Mailing List')
@ApiBearerAuth()
@Controller('mailing-list')
export class MailingListController {
  constructor(private readonly mailingListService: MailingListService) {}

  @Post()
  create(@Body() createMailingListDto: CreateMailingListDto) {
    return this.mailingListService.createMailingList(createMailingListDto);
  }

  @Get()
  async findAll(
    @Query(new PaginationParamsPipe()) query: GetMailingListDto,
  ): Promise<PaginatedResponse<MailingList>> {
    return this.mailingListService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mailingListService.findOne(Number(id));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateMailingListDto: UpdateMailingListDto,
  ) {
    return this.mailingListService.updateMailingList(
      Number(id),
      updateMailingListDto,
    );
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mailingListService.remove(Number(id));
  }
}
