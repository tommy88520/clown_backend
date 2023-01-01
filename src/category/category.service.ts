import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepository) {}
  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepo.create(createCategoryDto);
  }

  findAllCategory() {
    return this.categoryRepo.findAllCategory({});
  }

  findCategoryDetail(category: string) {
    return this.categoryRepo.findCategoryDetail(category);
  }
}
