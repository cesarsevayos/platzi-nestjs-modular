import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Res,
  // ParseIntPipe,
} from '@nestjs/common';

import { Response } from 'express';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from '../dtos/products.dtos';
import { ProductsService } from './../services/products.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Productos')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts() {
    return this.productsService.findAll();
  }

  @Get()
  getProductsFilter(@Query() params: FilterProductsDto) {
    return this.productsService.findAllFilter(params);
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
  }

  @Put(':idProduct/category/:idCategory')
  addCategoryProduct(
    @Param('idProduct', ParseIntPipe) idProduct: number,
    @Param('idCategory', ParseIntPipe) idCategory: number,
  ) {
    return this.productsService.addCategoryToProduct(idProduct, idCategory);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }

  @Delete(':idProduct/category/:idCategory')
  deleteCategory(
    @Param('idProduct', ParseIntPipe) idProduct: number,
    @Param('idCategory', ParseIntPipe) idCategory: number,
  ) {
    return this.productsService.removeCategoryByProduct(idProduct, idCategory);
  }
}
