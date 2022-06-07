import {
  Body,
  Query,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { getAllOrdersDto } from 'src/dto/get-all-orders.dro';
import { makeOrderDto } from 'src/dto/make-order.dto';
import { updateOrderStatusDto } from 'src/dto/update-order-status.dto';
import { updateOrderDto } from 'src/dto/update-order.dto';
import {
  getErrorMessage,
  getSuccessMessage,
} from 'src/utils/response-functions.utils';
import { OrdersService } from './orders.service';

@Controller('/api/v1/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  //@UseGuards(AuthGuard('bearer'))
  async makeAnOrder(@Body() data: makeOrderDto) {
    try {
      const result = await this.ordersService.makeAnOrder(data);

      return getSuccessMessage(result);
    } catch (err) {
      return getErrorMessage('Not able to make an order with given params');
    }
  }

  @Get(':orderId')
  @UsePipes(ValidationPipe)
  async getOneOrder(@Param('orderId') id: string) {
    try {
      const foundOrder = await this.ordersService.getAnOrder(id);
      return getSuccessMessage(foundOrder);
    } catch (err) {
      return getErrorMessage('Could not find an order with given params');
    }
  }

  @Get()
  @UsePipes(ValidationPipe)
  // @UseGuards(AuthGuard('bearer'))
  async getAllOrders(@Query() data: getAllOrdersDto) {
    try {
      const orders = await this.ordersService.getAllOrders(data);
      return getSuccessMessage(orders);
    } catch (err) {
      return getErrorMessage(err);
    }
  }

  @Delete(':orderId')
  //@UseGuards(AuthGuard('bearer'))
  async deleteOrder(@Param('orderId') id: string) {
    try {
      const deletedOrder = await this.ordersService.deleteAnOrder(id);
      return getSuccessMessage(deletedOrder);
    } catch (err) {
      return getErrorMessage('Could not delete the order with given params');
    }
  }

  @Patch(':orderId')
  //@UsePipes(ValidationPipe)
  //@UseGuards(AuthGuard('bearer'))
  async updateAdress(
    @Param('orderId') id: string,
    @Body() data: updateOrderDto,
  ) {
    try {
      const updatedOrder = await this.ordersService.updateOrder(id, data);
      return getSuccessMessage(updatedOrder);
    } catch (err) {
      return getErrorMessage('Could not update tan order with given params');
    }
  }

  @Patch(':orderId')
  //@UsePipes(ValidationPipe)
  //@UseGuards(AuthGuard('bearer'))
  async updateStatus(
    @Param('orderId') id: string,
    @Body() data: updateOrderStatusDto,
  ) {
    try {
      const updatedOrder = await this.ordersService.updateOrderStatus(id, data);
      return getSuccessMessage(updatedOrder);
    } catch (err) {
      return getErrorMessage('Could not update the order with given params ');
    }
  }
}
