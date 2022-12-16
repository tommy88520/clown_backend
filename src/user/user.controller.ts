import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createAccount(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createAccount(createUserDto);
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // async login(@Request() req): Promise<any> {
  //   return this.authService.login();
  // }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async findOne(@Body() body) {
    return await this.userService.validateUser(body.email);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
