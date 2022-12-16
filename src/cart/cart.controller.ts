import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddCartDto } from './dto/Add-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserData } from '../user/dto/user-data.dto';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async addCartItem(@Body() AddCartDto: AddCartDto[], @Headers() headers) {
    const userData: any = this.jwtService.decode(
      headers.authorization.slice(7),
    );
    const { userId } = userData;

    return await this.cartService.addCartItem(userId, AddCartDto);
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
