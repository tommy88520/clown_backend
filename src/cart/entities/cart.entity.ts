import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CartDocument = Document & Cart;

@Schema({ collection: 'cart' })
export class Cart {
  @Prop()
  img: string;
  @Prop()
  describe: string;
  @Prop()
  quantity: number;
  @Prop()
  price: number;
}

export const cartSchema = SchemaFactory.createForClass(Cart);
