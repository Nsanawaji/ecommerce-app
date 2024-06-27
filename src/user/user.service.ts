import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async createUser(payload: CreateUserDto) {
    const { email, password, ...rest } = payload;
    const isUser = await this.userRepo.findOneBy({ email });
    if (isUser) {
      throw new HttpException(
        `User with this email: ${email} already exist`,
        400,
      );
    }

    //encrypt password
    const hashpassword = await bcrypt.hash(password, 12);

    try {
      const user = await this.userRepo.save({
        email,
        password: hashpassword,
        ...rest,
      });
      delete user.password;
      console.log('User successfully craeted');
      return user;
    } catch (error) {
      if (error.code === '22P02') {
        throw new BadRequestException('admin role should be lowercase');
      }
      return error;
    }
  }

  
}
