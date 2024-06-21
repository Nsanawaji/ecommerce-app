import { Body, Controller, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from 'src/dtos/create-product..dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async addProduct(@Body()payload: CreateProductDto){
    await this.productService.addProduct(payload)
  }
}
 