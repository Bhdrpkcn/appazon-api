import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ProductService } from './product.service';
import { ProductDocument } from './product.schema';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  //CREATE
  @Post()
  createProduct(
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description') description?: string,
  ): Promise<ProductDocument> {
    return this.productService.create(name, price, description);
  }
  //GET ALL
  @Get()
  findAllProducts(): Promise<ProductDocument[]> {
    return this.productService.findAll();
  }

  //ADD JWT Guards to REQUESTS (basically checkt the bearer token exist inside the request..)
  @UseGuards(JwtGuard)

  //GET ONE
  @Get(':id')
  findProduct(@Param('id') id: string): Promise<ProductDocument> {
    return this.productService.find(id);
  }
  //UPDATE
  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description') description?: string,
  ): Promise<ProductDocument> {
    return this.productService.update(id, name, price, description);
  }
  //DELETE
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
