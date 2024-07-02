import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from 'src/dtos/create-product..dto';
import { UpdateProductDto } from 'src/dtos/update-product.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new product' })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input, object invalid.' })
  @ApiBody({ type: CreateProductDto })
  async addProduct(@Body() payload: CreateProductDto) {
    return await this.productService.addProduct(payload);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiResponse({
    status: 200,
    description: 'The product details',
    type: CreateProductDto,
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiParam({ name: 'id', description: 'ID of the product to retrieve' })
  async findOne(@Param('id') id: number) {
    return await this.productService.findOneProduct(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: 200,
    description: 'List of all products',
    type: [CreateProductDto],
  })
  async findAll() {
    return await this.productService.findAllProducts();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiParam({ name: 'id', description: 'ID of the product to update' })
  @ApiBody({ type: UpdateProductDto })
  async updateProduct(
    @Param('id') id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return await this.productService.updateProduct(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({
    status: 204,
    description: 'The product has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiParam({ name: 'id', description: 'ID of the product to delete' })
  async deleteProduct(@Param('id') id: number) {
    return await this.productService.deleteProduct(id);
  }
  @Get('search')
  async searchAndFilterProducts(@Query() query: any) {
    await this.productService.searchAndFilterProducts(query);
  }
}
