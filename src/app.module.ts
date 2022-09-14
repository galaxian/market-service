import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from 'src/configs/typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './apps/product/product.module';
import { UserModule } from './apps/user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), UserModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
