import { Injectable } from '@nestjs/common';
import { AddCartDto } from './dto/Add-cart.dto';
import { CartRepository } from './cart.repository';
@Injectable()
export class CartService {
  constructor(private readonly cartRepo: CartRepository) {}
  async initCart(id: string) {
    const init = {
      id,
      products: null,
    };
    return this.cartRepo.initCart(init);
  }
  async addCartItem(id: string, AddCartDto: AddCartDto[]) {
    return await this.cartRepo.addCartItem(id, AddCartDto);
  }
}
