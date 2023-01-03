import { Controller, Get, Post, Body, Session, Headers } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
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
  @Get('profile')
  async findOne(@Session() session, @Headers() headers) {
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
