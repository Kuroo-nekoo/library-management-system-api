import { CheckedOutBookRepository } from './checked-out-book.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCheckedOutBookInput } from './dto/create-checked-out-book.input';
import { UpdateCheckedOutBookInput } from './dto/update-checked-out-book.input';
import { FindBookInput } from 'src/books/dto/find-book.input';
import { CheckedOutBook } from './entities/checked-out-book.entity';

@Injectable()
export class CheckedOutBooksService {
  constructor(
    private readonly checkedOutBooksRepository: CheckedOutBookRepository,
  ) {}

  create(createCheckedOutBookInput: CreateCheckedOutBookInput) {
    console.log(createCheckedOutBookInput);
    return this.checkedOutBooksRepository.save(
      this.checkedOutBooksRepository.create(createCheckedOutBookInput),
    );
  }

  findAll() {
    return `This action returns all checkedOutBook`;
  }

  async findOne(findBookInput: FindBookInput) {
    try {
      const book = await this.checkedOutBooksRepository.findOneOrFail(
        findBookInput,
      );
      return book;
    } catch (error) {
      throw new NotFoundException(
        `Book with id '${findBookInput.id}' hadn't been checked out`,
      );
    }
  }

  update(id: number, updateCheckedOutBookInput: UpdateCheckedOutBookInput) {
    return `This action updates a #${id} checkedOutBook`;
  }

  async remove(id: string) {
    try {
      const bookToRemove = await this.checkedOutBooksRepository.findOne(id);

      this.checkedOutBooksRepository.remove(bookToRemove);
      return bookToRemove;
    } catch (error) {
      throw new NotFoundException(
        `Book with id '${id}' hadn't been checked out`,
      );
    }
  }

  save(checkedOutBook: CheckedOutBook) {
    return this.checkedOutBooksRepository.save(checkedOutBook);
  }
}
