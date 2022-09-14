import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';
import { Order } from './entity/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), UserModule, ProductModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
