import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductService } from '../product/product.service';
import { User } from '../user/entity/user.entity';
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
}
