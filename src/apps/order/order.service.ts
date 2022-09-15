import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';
import { CreateOrderRequestDto } from './dto/create-order.dto';
import { OrderDetailResponseDto } from './dto/order-response.dto';
import { Order } from './entity/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) {}

  async createOrder(requestDto: CreateOrderRequestDto, userId: number) {
    const { quantity, orderStatus, productId } = requestDto;

    const findUser = await this.userService.findUserByfield({
      where: { id: userId },
    });

    if (!findUser) {
      throw new NotFoundException('존재하지 않는 회원입니다.');
    }

    const findProduct = await this.productService.findProductByfield({
      where: { id: productId },
    });

    if (!findProduct) {
      throw new NotFoundException('상품이 존재하지 않습니다.');
    }

    const totalPrice =
      quantity * findProduct.price + findProduct.deliveryFee - findProduct.sale;

    const order = new Order();
    order.quantity = quantity;
    order.totalPrice = totalPrice;
    order.orderStatus = orderStatus;
    order.user = findUser;
    order.product = findProduct;

    const saveOrder = await this.orderRepository.save(order);

    return saveOrder.toDetailResponseDto();
  }

  async findAllMyOrder(userId: number): Promise<OrderDetailResponseDto[]> {
    const findAllMyOrder = await this.orderRepository.find({
      relations: ['user', 'product'],
      where: { id: userId },
    });

    const result = [];
    findAllMyOrder.forEach((order) => {
      result.push(order.toDetailResponseDto());
    });

    return result;
  }

  async findMyOrder(
    orderId: number,
    userId: number,
  ): Promise<OrderDetailResponseDto> {
    const findOrder = await this.orderRepository.findOne({
      relations: ['user', 'product'],
      where: { id: orderId },
    });

    console.log(userId);

    if (!findOrder) {
      throw new NotFoundException('존재하지 않는 주문 내역입니다.');
    }

    if (userId !== findOrder.user.id) {
      throw new UnauthorizedException('본인 주문 내역이 아닙니다');
    }

    return findOrder.toDetailResponseDto();
  }

  async deleteMyOrder(
    orderId: number,
    userId: number,
  ): Promise<{ id: number }> {
    const findOrder = await this.orderRepository.findOne({
      relations: ['user', 'product'],
      where: { id: orderId },
    });

    console.log(userId);

    if (!findOrder) {
      throw new NotFoundException('존재하지 않는 주문 내역입니다.');
    }

    if (userId !== findOrder.user.id) {
      throw new UnauthorizedException('본인 주문 내역이 아닙니다');
    }

    const deleteOrderId = findOrder.id;

    await this.orderRepository.delete(orderId);

    return { id: deleteOrderId };
  }

  async findAllOrder(): Promise<OrderDetailResponseDto[]> {
    const findAllOrder = await this.orderRepository.find({
      relations: ['user', 'product'],
    });

    const result: OrderDetailResponseDto[] = [];

    findAllOrder.forEach((order) => {
      result.push(order.toDetailResponseDto());
    });

    return result;
  }

  async findOrder(id: number): Promise<OrderDetailResponseDto> {
    const findOrder = await this.orderRepository.findOne({
      relations: ['user', 'product'],
      where: { id: id },
    });

    if (!findOrder) {
      throw new NotFoundException('존재하지 않는 주문 내역입니다.');
    }

    return findOrder.toDetailResponseDto();
  }

  async deleteOrder(id: number): Promise<{ id: number }> {
    const findOrder = await this.orderRepository.findOne({
      relations: ['user', 'product'],
      where: { id: id },
    });

    if (!findOrder) {
      throw new NotFoundException('존재하지 않는 주문 내역입니다.');
    }

    const deleteOrderId = findOrder.id;

    await this.orderRepository.delete(id);

    return { id: deleteOrderId };
  }
}
