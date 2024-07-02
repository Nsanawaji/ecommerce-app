import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/dtos/create-product..dto';
import { UpdateProductDto } from 'src/dtos/update-product.dto';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private ProductRepo: Repository<Product>,
  ) {}

  //function that searches for a product by id
  async findItems(id: number) {
    const findPro = await this.ProductRepo.findOneBy({ id: id });
    if (!findPro) {
      throw new HttpException('Sorry no such product found', 404);
    }

    return findPro;
  }
  //Add new product
  async addProduct(payload: CreateProductDto) {
    const { name, ...rest } = payload;
    const isProduct = await this.ProductRepo.findOneBy({ name });
    if (isProduct) {
      throw new HttpException('Product already exist', 401);
    }
    try {
      const product = await this.ProductRepo.save(payload);
      return payload;
    } catch (error) {
      return error;
    }
  }

  //Find one product by id
  async findOneProduct(id) {
    return await this.findItems(id);
  }

  //update a product
  async updateProduct(id, payload: UpdateProductDto) {
    const isProduct = await this.findItems(id);
    return await this.ProductRepo.update(id, payload);
  }

  //Find all products
  async findAllProducts() {
    const allProducts = await this.ProductRepo.find();
    if (!allProducts) {
      throw new HttpException('No products found', 404);
    }
    return allProducts;
  }

  //delete a product
  async deleteProduct(id) {
    const isProduct = await this.ProductRepo.findOne({ where: { id: id } });
    if (isProduct) {
      return await this.ProductRepo.delete(id);
    }
  }

  async searchAndFilterProducts(query: any) {
    const qb = await this.ProductRepo.createQueryBuilder('product');

    if (query.name) {
      qb.andWhere('product.name LIKE :name', { name: `%${query.name}%` });
    }

    if (query.category) {
      qb.andWhere('product.category LIKE :category', {
        category: query.category,
      });
    }

    if (query.minPrice) {
      qb.andWhere('product.price >= minPrice', { minPrice: query.minPrice });
    }

    if (query.maxPrice) {
      qb.andWhere('product.price <= maxPrice', { maxPrice: query.maxPrice });
    }

    if (query.rating) {
      qb.andWhere('product.rating >= rating', { rating: query.rating });
    }

    return await qb.getMany()
  }
}
