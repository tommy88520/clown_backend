import { PartialType } from '@nestjs/mapped-types';
import { AddCartDto } from './Add-cart.dto';

export class UpdateCartDto extends PartialType(AddCartDto) {}
