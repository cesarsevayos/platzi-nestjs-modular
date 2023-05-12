import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  findAll() {
    //Devuelve todos los productos que esten en dicha entidad - tabla en base de datos
    //Se puede pasar algun where o condicion que se desee
    return this.productRepo.find();
  }

  async findOne(id: number) {
    //Busca en el repositorio de la entidad - tabla algun registro con dicho id
    const product = await this.productRepo.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(data: CreateProductDto) {
    /*
    HACER ESTO SE AHORRA LLAMANDO AL METODO CREATE EL CUAL CREA UNA INSTANCIA:
    const newProduct = new Product();
    newProduct.name = '';
    newProduct.description = '';
    newProduct.price = 3000;
    newProduct.stock = 50;
    newProduct.image = 'url';
    */
    //EL CREATE SE ENCARGA DE CREAR LA INSTANCIA DEL OBJETO CON LA DATA MAS NO LO GUARDA EN DB
    const newProduct = this.productRepo.create(data);
    return this.productRepo.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    //PARA ACTUALIZAR SE PUEDE USAR EL METODO MERGE DEL REPOSITORIO, EL CUAL SE ENCARGA DE ACTUALIZAR
    //LOS CAMBIOS RECIBIDOS CON LOS DEL PRODUCTO Y LUEGO LLAMAR AL SAVE PARA PERSISTIR EN DB
    const product = await this.productRepo.findOne(id);
    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }

  remove(id: number) {
    return this.productRepo.delete(id);
  }

  //METODOS USANDO LISTA EN MEMORIA:
  /*
  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(data: CreateProductDto) {
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, changes: UpdateProductDto) {
    const product = this.findOne(id);
    const index = this.products.findIndex((item) => item.id === id);
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  remove(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.products.splice(index, 1);
    return true;
  }
  */
}
