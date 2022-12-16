import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Cart, CartDocument } from './entities/cart.entity';

@Injectable()
export class CartRepository {
  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}
  async initCart(query): Promise<any> {
    const result = new this.cartModel(query);
    return result.save();
  }
  async addCartItem(id: string, query: FilterQuery<Cart[]>): Promise<Cart[]> {
    return await this.cartModel.findOneAndUpdate(
      { id },
      { $set: { products: query } },
    );
  }
}
