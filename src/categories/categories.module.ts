import { CategoriesRepository } from './category.repository';
import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriesRepository])],
  providers: [CategoriesResolver, CategoriesService],
})
export class CategoriesModule {}
