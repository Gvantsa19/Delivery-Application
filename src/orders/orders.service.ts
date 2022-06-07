import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getAllOrdersDto } from 'src/dto/get-all-orders.dro';
import { makeOrderDto } from 'src/dto/make-order.dto';
import { Order } from 'src/interface/order.interface';
import { User } from 'src/interface/user.interface';
import { OrderStatus } from 'src/enums/order-status.enum';

import { updateOrderDto } from 'src/dto/update-order.dto';
import { updateOrderStatusDto } from 'src/dto/update-order-status.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order')
    private orderModel: Model<Order>,
    @InjectModel('User')
    private userModel: Model<User>,
  ) {}

  //allows customer to make a new order

  async makeAnOrder(data: makeOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel({
      size: data.size,
      souce: data.souce,
      notIncludes: data.notIncludes,
      status: OrderStatus.processing,
      address: data.address
        ? data.address
        : (await this.userModel.findById(data.user)).address,
      user: data.user,
      creationDate: new Date(),
    });

    await createdOrder.save();

    return {
      id: createdOrder.id,
      size: createdOrder.size,
      souce: createdOrder.souce,
      notIncludes: createdOrder.notIncludes,
      status: createdOrder.status,
      address: createdOrder.address,
      user: createdOrder.user,
      creationDate: createdOrder.creationDate,
    };
  }

  // allows customer to get a single order by its id

  async getAnOrder(id: string): Promise<Order> {
    const foundOrder = await this.orderModel.findById(id);
    return {
      id: foundOrder._id,
      size: foundOrder.size,
      souce: foundOrder.souce,
      notIncludes: foundOrder.notIncludes,
      status: foundOrder.status,
      address: foundOrder.address,
      user: foundOrder.user,
      creationDate: foundOrder.creationDate,
    };
  }

  //to get all orders and sort/filer them
  //for managers' use only

  async getAllOrders(data: getAllOrdersDto) {
    const query = this.orderModel.find();
    if (data.sortBy) {
      query.sort(data.sortBy);
    } else {
      query.sort('-creationDate');
    }

    if (data.limit) {
      const limit = Number(data.limit);
      const page = data.page ? Number(data.page) - 1 : 0;
      query.limit(limit);
      query.skip(page);
    } else {
      query.limit(20);
    }

    query.populate('user', 'id email fullName');

    const result = await query;

    const orderResults: Order[] = result.map((order) => ({
      id: order._id,
      size: order.size,
      souce: order.souce,
      notIncludes: order.notIncludes,
      status: order.status,
      address: order.address,
      user: order.user,
      creationDate: order.creationDate,
    }));

    return orderResults;
  }

  //allows customer to delete the order while it's processing

  async deleteAnOrder(id: string): Promise<Order> {
    const result = await this.orderModel.findByIdAndDelete(id);

    return {
      id: result._id,
      size: result.size,
      souce: result.souce,
      notIncludes: result.notIncludes,
      status: result.status,
      address: result.address,
      user: result.user,
    };
  }

  //allows the customer to update the address if the order's status is processing;
  async updateOrder(id: string, data: updateOrderDto): Promise<Order> {
    const updatedOrder = this.orderModel.findByIdAndUpdate(id, {
      ...data,
    });

    return await updatedOrder;
  }

  async updateOrderStatus(
    id: string,
    data: updateOrderStatusDto,
  ): Promise<Order> {
    const updatedOrder = this.orderModel.findByIdAndUpdate(id, {
      ...data,
    });

    return await updatedOrder;
  }
}
