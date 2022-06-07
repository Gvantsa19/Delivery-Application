import { OrderNotIncludes } from 'src/enums/order-not-includes.enum';
import { OrderStatus } from 'src/enums/order-status.enum';
import { ProductSize } from 'src/enums/product-size.enum';
import { WhichSouce } from 'src/enums/which-souce.enum';
import { User } from './user.interface';

export interface Order {
  id: string;
  size: ProductSize;
  souce: WhichSouce;
  notIncludes: OrderNotIncludes[];
  status: OrderStatus;
  address: string;
  user: User;
  creationDate?: Date;
}
