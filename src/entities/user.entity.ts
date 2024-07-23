import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { userRole } from 'src/enum/role.enum';
import { Product } from './product.entity';

@Entity()
export class User extends Base {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column({
    type: 'enum',
    enum: userRole,
    default: userRole.user,
  })
  role: userRole;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];
}
