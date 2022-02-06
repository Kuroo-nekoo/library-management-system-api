import { FindBookArgs } from './dto/find-book.args';
import { BookRepository } from './book.repository';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
      const { bookId, barcode } = findBookArgs;

      if (!bookId && !barcode) {
        throw new BadRequestException('You must provide bookId or barcode');
      }

      if (bookId) {
        return this.bookRepository.findOne(bookId);
      } else if (barcode) {
        return this.bookRepository.findOne({ where: { barcode } });
      }
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
}
