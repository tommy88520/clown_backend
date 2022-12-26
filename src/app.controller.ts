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
import { OAuth2Client } from 'google-auth-library';

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
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async googleLogin(@Body() body) {
    console.log('body', body);

    return { msg: 'Google Authentication' };
  }
  @Get('google/redirect')
  @Redirect('http://localhost:3000')
  @UseGuards(GoogleAuthGuard)
  async handleRedirect(@Request() request) {
    console.log('request.user', request.user);
    return request.user;
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(authenticatedGuard)
  @Get('profile')
  async getProfile(@Request() req, @Session() session) {
    // console.log(session.id);
    console.log('session', req.user);

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
