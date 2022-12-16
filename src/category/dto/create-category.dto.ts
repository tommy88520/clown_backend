import { ProductsDto } from './products.dto';
export class CreateCategoryDto {
  title: string;
  imageUrl: string;
  route: string;
  products: [ProductsDto];
}
