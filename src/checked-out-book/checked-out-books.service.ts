import { CheckedOutBookRepository } from './checked-out-book.repository';
import { Injectable } from '@nestjs/common';
import { CreateCheckedOutBookInput } from './dto/create-checked-out-book.input';
import { UpdateCheckedOutBookInput } from './dto/update-checked-out-book.input';

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

  findOne(id: number) {
    return `This action returns a #${id} checkedOutBook`;
  }

  update(id: number, updateCheckedOutBookInput: UpdateCheckedOutBookInput) {
    return `This action updates a #${id} checkedOutBook`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkedOutBook`;
  }
}
