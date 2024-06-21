import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/dtos/create-product..dto';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private ProductRepo: Repository<Product>,
  ) {}

  async addProduct(payload: CreateProductDto) {
    const product = await this.ProductRepo.save(payload);
    return product;
  }

  async findOneProduct(id) {
    const isProduct = await this.ProductRepo.findOne({ where: { id: id } });
    return isProduct;
  }

  async updateProduct(){

  }

  async findAllProducts(){
    const allProducts = await this.ProductRepo.find()
    return allProducts 
  }
}
