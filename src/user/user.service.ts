import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Profile } from 'passport-google-oauth20';
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
    const user = await this.validateUser(createUserDto.email);
    if (user) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: '帳號已經存在',
        },
        HttpStatus.FORBIDDEN,
      );
    } else {
      const { password } = createUserDto;
      const hash = await bcrypt.hash(password, 10);
      const userId = uuidv4();
      await this.cartService.initCart(userId);
      return await this.userRepo.createAccount({
        userId,
        ...createUserDto,
        password: hash,
        confirm_password: hash,
        token: null,
        google_login: false,
        session_id: null,
        createDate: new Date(),
      });
    }
  }

  async googleCreateAccount(profile: Profile) {
    const userId = uuidv4();
    await this.cartService.initCart(userId);
    return await this.userRepo.createAccount({
      userId,
      nickname: profile.emails[0].value,
      email: profile.emails[0].value,
      gender: null,
      password: null,
      confirm_password: null,
      token: null,
      google_login: true,
      session_id: null,
      createDate: new Date(),
    });
  }

  async validateUser(email: string) {
    return await this.userRepo.validateUser(email);
  }

  async updateAuth(email: string, token: string, session_id: string) {
    return await this.userRepo.updateAuth(email, token, session_id);
  }

  async getUserInfo(session_id: string) {
    const userData = await this.userRepo.getUserInfo(session_id);
    if (!userData) {
      return '非會員';
    } else {
      return userData;
    }
  }
}
