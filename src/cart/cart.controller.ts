import { Controller, Post, Body, Headers } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddCartDto } from './dto/Add-cart.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private jwtService: JwtService,
  ) {}

  // @UseGuards(JwtAuthGuard)
  @Post()
  async addCartItem(@Body() AddCartDto: AddCartDto[], @Headers() headers) {
    const userData: any = this.jwtService.decode(
      headers.authorization.slice(7),
    );
    const { userId } = userData;

    return await this.cartService.addCartItem(userId, AddCartDto);
  }
}
