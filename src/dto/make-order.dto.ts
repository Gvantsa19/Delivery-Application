import { IsArray, IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderNotIncludes } from 'src/enums/order-not-includes.enum';
import { ProductSize } from '../enums/product-size.enum';
import { WhichSouce } from '../enums/which-souce.enum';

export class makeOrderDto {
  @IsEnum(ProductSize)
  size: ProductSize;
  @IsEnum(WhichSouce)
  souce: WhichSouce;
  @IsArray()
  notIncludes: OrderNotIncludes[];
  @IsString()
  @IsOptional()
  address: string;
  @IsString()
  user: string;
}
