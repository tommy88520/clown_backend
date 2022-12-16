import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Session,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { authenticatedGuard } from './auth/authenticated.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.body.username);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(authenticatedGuard)
  @Get('profile')
  async getProfile(@Request() req, @Session() session) {
    console.log(session);

    return `fds`;
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
