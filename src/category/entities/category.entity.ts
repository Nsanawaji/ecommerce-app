import { Base } from "src/entities/base.entity";
import { Product } from "src/entities/product.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Category extends Base {
  @Column()
  name: string;

  @Column({ default: '' })
  description: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
