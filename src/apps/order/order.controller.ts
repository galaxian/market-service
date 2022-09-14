import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '../user/security/auth.guard';
import { CreateOrderRequestDto } from './dto/create-order.dto';
import { OrderService } from './order.service';

@Controller({ path: 'orders', version: ['1', '2'] })
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  createOrder(@Body() requestDto: CreateOrderRequestDto, @Req() req: Request) {
    const userId: number = req.body.id;
    return this.orderService.createOrder(requestDto, userId);
  }
}
