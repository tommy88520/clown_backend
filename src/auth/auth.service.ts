import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Profile } from 'passport-google-oauth20';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.userService.validateUser(email);
      const passwordValidated = bcrypt.compare(password, user.password);
      if (user && passwordValidated) {
        const { password, ...result } = user;
        return result;
      }
    } catch (error) {
      return '帳號或密碼錯誤';
    }
  }

  async login(email: string) {
    try {
      const user = await this.userService.validateUser(email);
      const payload = { email: user.email, userId: user.userId };
      const token = await this.jwtService.signAsync(payload);
      await this.userService.updateToken(user.email, token);
      return {
        access_token: token,
        user_data: payload,
      };
    } catch (error) {
      return '帳號或密碼錯誤';
    }
  }
}
