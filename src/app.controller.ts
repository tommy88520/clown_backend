import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Session,
  Body,
  Redirect,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { authenticatedGuard } from './auth/authenticated.guard';
import { GoogleAuthGuard } from './auth/google-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body) {
    console.log(body);

    return await this.authService.login(body.username);
  }
  @Get('google/signUp')
  // @UseGuards(GoogleAuthGuard)
  async googleLogin(@Request() request) {
    return { msg: 'Google Authentication' };
  }
  // @Get('google/redirect')
  // @Redirect('http://localhost:3000/sign-up')
  // @UseGuards(GoogleAuthGuard)
  // async handleRedirect(@Request() request) {
  //   console.log('request.user', request.user);
  //   return request.user;
  // }

  @UseGuards(JwtAuthGuard)
  @UseGuards(authenticatedGuard)
  @Get('profile')
  async getProfile(@Request() req, @Session() session) {
    return `fds`;
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
function Req() {
  throw new Error('Function not implemented.');
}
