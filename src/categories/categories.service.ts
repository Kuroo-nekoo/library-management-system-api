import { CategoriesRepository } from './category.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  create(createCategoryInput: CreateCategoryInput) {
    return this.categoriesRepository.save(
      this.categoriesRepository.create(createCategoryInput),
    );
  }

  findAll() {
    return this.categoriesRepository.find();
  }

  findOne(id: string) {
    try {
      return this.categoriesRepository.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException("Category doesn't exist!");
    }
  }

  async update(id: string, updateCategoryInput: UpdateCategoryInput) {
    try {
      await this.categoriesRepository.update(id, updateCategoryInput);
      const updatedCategory = await this.categoriesRepository.findOneOrFail(id);

      return updatedCategory;
    } catch (error) {
      throw new NotFoundException("Category doesn't exist!");
    }
  }

  async remove(id: string) {
    try {
      const categoryToRemove = await this.categoriesRepository.findOneOrFail(
        id,
      );

      await this.categoriesRepository.remove(categoryToRemove);
      return categoryToRemove;
    } catch (error) {
      throw new NotFoundException("Category doesn't exist!");
    }
  }
}
