import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProductsDto } from '../dto/products.dto';

export type CategoryDocument = Document & Category;

@Schema()
export class Category {
  @Prop()
  title: string;
  @Prop()
  imageUrl: string;
  @Prop()
  route: string;
  @Prop()
  products: [ProductsDto];
}

export const categorySchema = SchemaFactory.createForClass(Category);
