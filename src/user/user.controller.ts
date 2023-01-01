import { categorySchema } from './../category/entities/category.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Session,
  Headers,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('signUp')
  async createAccount(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createAccount(createUserDto);
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // async login(@Request() req): Promise<any> {
  //   return this.authService.login();
  // }
  // @UseGuards(JwtAuthGuard)
  @Get('profile')
  async findOne(@Session() session, @Headers() headers) {
    // console.log('profile', session.id);
    const auth = headers.authorization.slice(7);

    if (!headers.authorization || auth === 'null') {
      return await this.userService.getUserInfo(session.id);
    } else {
      const tokenDecode: any = this.jwtService.decode(auth);
      if (!tokenDecode) {
        return 'token錯誤';
      }
      return await this.userService.validateUser(tokenDecode.email);
    }
  }
}
