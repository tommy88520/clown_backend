import { Injectable } from '@nestjs/common';
import { AddCartDto } from './dto/Add-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
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

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
