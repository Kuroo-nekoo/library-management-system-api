import { ID } from '@nestjs/graphql';
import { FindBookArgs } from './dto/find-book.args';
import { AuthorsService } from './../authors/authors.service';
import { BookRepository } from './book.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Author } from 'src/authors/entities/author.entity';

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
      const { id, barcode } = findBookArgs;

      if (id) {
        return this.bookRepository.findOne(id);
      } else if (barcode) {
        return this.bookRepository.findOne({ where: { barcode } });
      }
    } catch (error) {
      throw new NotFoundException();
    }
  }

  update(id: number, updateBookInput: UpdateBookInput) {
    return `This action updates a #${id} book`;
  }

  async remove(id: string) {
    try {
      const bookToRemove = await this.bookRepository.findOneOrFail(id);

      this.bookRepository.remove(bookToRemove);
      return bookToRemove;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findBookAuthors(id: string) {
    const book = await this.bookRepository.findOne(id, {
      relations: ['authors'],
    });

    // console.log(book.authors);

    return book.authors;
  }
}
