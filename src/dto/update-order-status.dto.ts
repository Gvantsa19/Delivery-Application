import { IsEnum } from 'class-validator';
import { OrderStatus } from 'src/enums/order-status.enum';

export class updateOrderStatusDto {
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
