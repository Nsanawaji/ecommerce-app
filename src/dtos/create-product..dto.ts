import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Product Name',
    description: 'The name of the product',
  })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Product Description',
    description: 'The description of the product',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 100,
    description: 'The price of the product',
  })
  price: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The url of the picture of the product',
  })
  imageUrl: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'In-stock',
    description:
      'This specifies whether the product is in-stock or out-of-stock',
  })
  stock: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'The category of the product',
  })
  category: Category;
}
