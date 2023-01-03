import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Session,
  Body,
  Response,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { GoogleAuthGuard } from './auth/google-auth.guard';
import { ConfigModule } from '@nestjs/config';

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
  async googleLogin() {
    return { msg: 'Google Authentication' };
  }
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async handleRedirect(
    @Request() request,
    @Session() session,
    @Response() res,
  ) {
    res.redirect(process.env.FRONTEND_URL);
    const result = await this.authService.login(request.user.email, session.id);
    return result;
  }

  @Get('profile')
  async getProfile(@Request() req, @Session() session) {
    return `success`;
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
