import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Category, CategoryDocument } from './entities/category.entity';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async findAllCategory(query: FilterQuery<Category>): Promise<Category[]> {
    return this.categoryModel.find(query);
  }

  async findCategoryDetail(query): Promise<Category> {
    return this.categoryModel.findOne(
      { title: `${query}` },
      { products: true },
    );
  }
  async create(query: FilterQuery<Category>): Promise<Category> {
    const result = new this.categoryModel(query);
    return result.save();
  }
}
