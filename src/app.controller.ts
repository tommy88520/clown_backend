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
  async login(@Body() body, @Session() session) {
    return await this.authService.login(body.username, session.id);
  }
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async googleLogin(@Body() body, @Session() session) {
    return { msg: 'Google Authentication' };
  }
  @Get('google/redirect')
  @Redirect('http://localhost:3000')
  @UseGuards(GoogleAuthGuard)
  async handleRedirect(@Request() request, @Session() session) {
    const result = await this.authService.login(request.user.email, session.id);
    return result;
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(authenticatedGuard)
  @Get('profile')
  async getProfile(@Request() req, @Session() session) {
    return `success`;
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
