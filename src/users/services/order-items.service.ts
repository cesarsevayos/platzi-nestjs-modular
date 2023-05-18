import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateOrderItemDto } from '../dtos/order.item.dto';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  findAll() {
    return this.orderItemRepo.find();
  }

  async findOne(id: number) {
    const order = await this.orderItemRepo.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order Item #${id} not found`);
    }
    return order;
  }

  async create(data: CreateOrderItemDto) {
    const order = await this.orderRepo.findOne({
      where: { id: data.orderId },
    });
    const product = await this.productRepo.findOne({
      where: { id: data.productId },
    });
    const item = new OrderItem();
    item.order = order;
    item.product = product;
    item.quantity = data.quantity;
    this.orderItemRepo.save(item);
  }

  remove(id: number) {
    return this.orderItemRepo.delete(id);
  }
}
