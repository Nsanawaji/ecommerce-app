import { Entity, Column, ManyToOne } from 'typeorm';
import { Base } from './base.entity';
import { Category } from 'src/category/entities/category.entity';
import { User } from './user.entity';

@Entity()
export class Product extends Base {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ default: '' })
  imageUrl: string;

  @Column({ default: 'In-stock' })
  stock: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToOne(() => User, (user) => user.products)
  user: User;
}
