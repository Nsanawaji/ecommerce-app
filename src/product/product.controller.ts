import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from 'src/dtos/create-product..dto';
import { UpdateProductDto } from 'src/dtos/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async addProduct(@Body() payload: CreateProductDto) {
    return await this.productService.addProduct(payload);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.productService.findOneProduct(id);
  }

  @Get()
  async findAll() {
    return await this.productService.findAllProducts();
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return await this.productService.updateProduct(id, payload);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    return await this.productService.deleteProduct(id);
  }
}
