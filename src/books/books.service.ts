import { FindBookArgs } from './dto/find-book.args';
import { BookRepository } from './book.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Author } from 'src/authors/entities/author.entity';
import { Category } from 'src/categories/entities/category.entity';
import { FindBookInput } from './dto/find-book.input';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(private bookRepository: BookRepository) {}

  async create(createBookInput: CreateBookInput, authors: Author[]) {
    const { authorIds, ...bookToCreate } = createBookInput;

    return this.bookRepository.save(
      this.bookRepository.create({ ...bookToCreate, authors }),
    );
  }

  async findAll() {
    return this.bookRepository.find();
  }

  findOne(findBookArgs: FindBookArgs) {
    try {
      return this.bookRepository.findOne(findBookArgs);
    } catch (error) {
      throw new NotFoundException("Book doesn't exist");
    }
  }

  async update(id: string, updateBookInput: UpdateBookInput) {
    try {
      await this.bookRepository.update(id, updateBookInput);
      return this.bookRepository.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException("Book doesn't exist!");
    }
  }

  async remove(id: string) {
    try {
      const bookToRemove = await this.bookRepository.findOneOrFail(id);

      this.bookRepository.remove(bookToRemove);
      return bookToRemove;
    } catch (error) {
      throw new NotFoundException("Book doesn't exist!");
    }
  }

  async findBookAuthors(id: string) {
    try {
      const book = await this.bookRepository.findOne(id, {
        relations: ['authors'],
      });

      return book.authors;
    } catch (error) {
      throw new NotFoundException("Book doesn't exist!");
    }
  }

  async addCategory(findBookInput: FindBookInput, categoryToAdd: Category) {
    const book = await this.findOne(findBookInput);

    if (
      book.categories.findIndex(
        (category) => category.id === categoryToAdd.id,
      ) !== -1
    ) {
      throw new NotFoundException('Category already exists!');
    }

    book.categories.push(categoryToAdd);
    this.bookRepository.save(book);
    return book;
  }

  async removeCategory(findBookInput: FindBookInput, categoryId: string) {
    const book = await this.findOne(findBookInput);
    const categoryIdx = book.categories.findIndex(
      (category) => category.id === categoryId,
    );

    if (categoryIdx === -1) {
      throw new NotFoundException("Book doesn't have this category!");
    }

    book.categories.splice(categoryIdx, 1);
    this.bookRepository.save(book);
    return book;
  }

  save(book: Book) {
    return this.bookRepository.save(book);
  }
}
