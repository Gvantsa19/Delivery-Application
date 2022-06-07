import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OrderNotIncludes } from 'src/enums/order-not-includes.enum';
import { OrderStatus } from 'src/enums/order-status.enum';
import { ProductSize } from 'src/enums/product-size.enum';
import { WhichSouce } from 'src/enums/which-souce.enum';

@Schema()
class Order {
  @Prop({ required: true, enum: ProductSize })
  size: ProductSize;
  @Prop({ required: true, enum: WhichSouce })
  souce: WhichSouce;
  @Prop({ required: true })
  notIncludes: OrderNotIncludes[];
  @Prop({ required: true, enum: OrderStatus })
  status: OrderStatus;
  @Prop({ required: true, type: 'string' })
  address: string;
  @Prop({ required: true, type: 'string' })
  user: string;
  @Prop({ required: false, type: 'date' })
  creationDate: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
