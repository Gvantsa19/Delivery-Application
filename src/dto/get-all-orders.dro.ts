import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from 'src/enums/order-status.enum';

class SearchFields {
  status: OrderStatus;
}

export class getAllOrdersDto {
  @IsString()
  @IsOptional()
  sortBy?: string;
  @Type(() => {
    return Number;
  })
  @IsOptional()
  @IsInt()
  limit?: number;
  @Type(() => {
    return Number;
  })
  @IsOptional()
  @IsInt()
  page?: number;
  @IsOptional()
  @Type(() => SearchFields)
  searchBy?: SearchFields;
}
