import { Entity, Column } from "typeorm";
import { Base } from "./base.entity";

@Entity()
export class Product extends Base {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({default: ''})
  imageUrl: string;

  @Column()
  category: string;

  @Column({default: 'In-stock'})
  stock: string;
}
