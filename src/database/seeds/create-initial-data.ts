import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/apps/order/entity/order.entity';
import { OrderStatus } from 'src/apps/order/entity/order.status';
import { Product } from 'src/apps/product/entity/product.entity';
import { Authority } from 'src/apps/user/entity/user.authority';
import { User } from 'src/apps/user/entity/user.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export class CreateInitialData implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          id: 1,
          email: 'abcd1234@naver.com',
          username: '네이버',
          authority: Authority.USER,
        },
        {
          id: 2,
          email: 'abcd1234@google.com',
          username: '구글',
          authority: Authority.ADMIN,
        },
        {
          id: 3,
          email: 'abcd1234@kakao.com',
          username: '카카오',
          authority: Authority.USER,
        },
        {
          id: 4,
          email: 'abcd1234@ms.com',
          username: '마이크로소프트',
          authority: Authority.ADMIN,
        },
      ])
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(Product)
      .values([
        {
          id: 1,
          productName: '아스파라거스',
          price: 10000,
          origin: 'Korea',
          deliveryDate: 3,
          deliveryFee: 1000,
          sale: 1000,
          images: '이미지 url',
          mainImage: '이미지 url',
          isSoldOut: false,
        },
        {
          id: 2,
          productName: '양파',
          price: 5000,
          origin: 'Korea',
          deliveryDate: 3,
          deliveryFee: 0,
          sale: 0,
          images: '이미지 url',
          mainImage: '이미지 url',
          isSoldOut: false,
        },
        {
          id: 3,
          productName: '사과',
          price: 1000,
          origin: 'Korea',
          deliveryDate: 1,
          deliveryFee: 50,
          sale: 10,
          images: '이미지 url',
          mainImage: '이미지 url',
          isSoldOut: true,
        },
      ])
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(Order)
      .values([
        {
          id: 1,
          quantity: 3,
          orderStatus: OrderStatus.READY,
          totalPrice: 30000,
          user: {
            id: 1,
            email: 'abcd1234@naver.com',
            username: '네이버',
            authority: Authority.USER,
          },
          product: {
            id: 1,
            productName: '아스파라거스',
            price: 10000,
            origin: 'Korea',
            deliveryDate: 3,
            deliveryFee: 1000,
            sale: 1000,
            images: '이미지 url',
            mainImage: '이미지 url',
            isSoldOut: false,
          },
        },
      ])
      .execute();
  }
}
