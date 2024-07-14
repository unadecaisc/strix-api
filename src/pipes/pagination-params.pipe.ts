import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PaginationParamsPipe implements PipeTransform {
  transform(value: any) {
    if (value.page) {
      value.page = parseInt(value.page);
    }
    if (value.limit) {
      value.size = parseInt(value.size);
    }
    return value;
  }
}
