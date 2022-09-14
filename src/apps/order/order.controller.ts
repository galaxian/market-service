import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '../user/security/auth.guard';
import { CreateOrderRequestDto } from './dto/create-order.dto';
import { OrderDetailResponseDto } from './dto/order-response.dto';
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

  @Get()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  findAllMyOrder(@Req() req: Request): Promise<OrderDetailResponseDto[]> {
    const userId: number = req.body.id;
    return this.orderService.findAllMyOrder(userId);
  }

  @Get('/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  findMyOrder(
    @Param('id', ParseIntPipe) orderId,
    @Req() req,
  ): Promise<OrderDetailResponseDto> {
    const userId: number = req.user.id;
    return this.orderService.findMyOrder(orderId, userId);
  }

  @Delete(':/id')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  deleteMyOrder(
    @Param('id', ParseIntPipe) orderId,
    @Req() req,
  ): Promise<{ id: number }> {
    const userId: number = req.user.id;
    return this.orderService.deleteMyOrder(orderId, userId);
  }
}
