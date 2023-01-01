import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.validateUser(email);

    if (!user) {
      throw new UnauthorizedException({
        status: '登入未完成',
        error: '帳號或密碼錯誤',
      });
    }
    const passwordValidated = bcrypt.compare(password, user.password);

    if (!passwordValidated) {
      throw new UnauthorizedException({
        status: '登入未完成',
        error: '帳號或密碼錯誤',
      });
    }
    return user;
  }

  async login(email: string, session_id: string) {
    const user = await this.userService.validateUser(email);
    const payload = { email: user.email, userId: user.userId };
    const token = await this.jwtService.signAsync(payload);
    await this.userService.updateAuth(user.email, token, session_id);
    return {
      access_token: token,
      user_data: payload,
    };
  }
}
