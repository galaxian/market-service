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
  Version,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Role } from '../user/decorator/role.decorator';
import { Authority } from '../user/entity/user.authority';
import { AuthGuard } from '../user/security/auth.guard';
import { RoleGuard } from '../user/security/role.guard';
import { CreateOrderRequestDto } from './dto/create-order.dto';
import { OrderDetailResponseDto } from './dto/order-response.dto';
import { OrderService } from './order.service';

@ApiTags('주문 내역 api')
@Controller({ path: 'orders', version: ['1', '2'] })
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({
    summary: '주문 등록 api',
    description:
      '상품 주문에 필요한 데이터를 받아 주문 내역을 DB에 등록하는 api',
  })
  @Post()
  @Version('1')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  createOrder(@Body() requestDto: CreateOrderRequestDto, @Req() req: Request) {
    const userId: number = req.body.id;
    return this.orderService.createOrder(requestDto, userId);
  }

  @ApiOperation({
    summary: '본인 주문 내역 전체 조회 api',
    description:
      '토큰을 사용하여 본인을 인증하고 본인 주문 내역을 전체 조회하는 api',
  })
  @Get()
  @Version('1')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  findAllMyOrder(@Req() req: Request): Promise<OrderDetailResponseDto[]> {
    const userId: number = req.body.id;
    return this.orderService.findAllMyOrder(userId);
  }

  @ApiOperation({
    summary: '본인 주문 내역 조회 api',
    description: '토큰을 사용해 본인을 인증하고 본인 주문 내역을 조회하는 api',
  })
  @Get('/:id')
  @Version('1')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  findMyOrder(
    @Param('id', ParseIntPipe) orderId,
    @Req() req,
  ): Promise<OrderDetailResponseDto> {
    const userId: number = req.user.id;
    return this.orderService.findMyOrder(orderId, userId);
  }

  @ApiOperation({
    summary: '본인 주문 내역 취소 api',
    description:
      '토큰을 사용해 본인을 인증하고 본인의 주문 내역을 취소하는 api',
  })
  @Delete(':/id')
  @Version('1')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  deleteMyOrder(
    @Param('id', ParseIntPipe) orderId,
    @Req() req,
  ): Promise<{ id: number }> {
    const userId: number = req.user.id;
    return this.orderService.deleteMyOrder(orderId, userId);
  }

  @ApiOperation({
    summary: '관리자용 주문 내역 전체 조회 api',
    description:
      '토큰을 사용해 관리자를 인증하고 주문 내역을 전체 조회하는 api',
  })
  @Get()
  @Version('2')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard, RoleGuard)
  @Role(Authority.ADMIN)
  findAllOrder(): Promise<OrderDetailResponseDto[]> {
    return this.orderService.findAllOrder();
  }

  @ApiOperation({
    summary: '관리자용 주문 내역 조회 api',
    description: '토큰을 사용해 관리자를 인증하고 주문 내역을 조회하는 api',
  })
  @Get('/:id')
  @Version('2')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard, RoleGuard)
  @Role(Authority.ADMIN)
  findOrder(@Param('id') id: number): Promise<OrderDetailResponseDto> {
    return this.orderService.findOrder(id);
  }

  @ApiOperation({
    summary: '관리자용 주문 내역 취소 api',
    description: '토큰을 사용해 관리자를 인증하고 주문 내역을 취소하는 api',
  })
  @Delete('/:id')
  @Version('2')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard, RoleGuard)
  @Role(Authority.ADMIN)
  deleteOrder(@Param('id', ParseIntPipe) id: number): Promise<{ id: number }> {
    return this.orderService.deleteOrder(id);
  }
}
