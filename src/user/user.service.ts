import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CartService } from '../cart/cart.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private cartService: CartService,
  ) {}
  async createAccount(createUserDto: CreateUserDto) {
    const user = this.validateUser(createUserDto.email);
    if (user) return user;
    const { password } = createUserDto;
    const hash = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    await this.cartService.initCart(userId);
    return await this.userRepo.createAccount({
      userId,
      createDate: new Date(),
      ...createUserDto,
      password: hash,
      confirm_password: hash,
      token: null,
    });
  }

  async googleCreateAccount(googleCreateUser) {
    const userId = uuidv4();
    await this.cartService.initCart(userId);
    return await this.userRepo.createAccount({
      userId,
      createDate: new Date(),
      ...googleCreateUser,
      password: null,
      confirm_password: null,
    });
  }

  async validateUser(email: string) {
    return await this.userRepo.validateUser(email);
  }

  async updateToken(email: string, token: string) {
    return await this.userRepo.updateToken(email, token);
  }

  // findAll() {
  //   return `This action returns all user`;
  // }

  //   findOne(id: number) {
  //     return `This action returns a #${id} user`;
  //   }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  //   remove(id: number) {
  //     return `This action removes a #${id} user`;
  //   }
}
