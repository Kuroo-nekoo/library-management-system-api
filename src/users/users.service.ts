import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from 'src/books/entities/book.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  create(createUserInput: CreateUserInput) {
    return this.usersRepository.save(
      this.usersRepository.create(createUserInput),
    );
  }

  findAll() {
    return this.usersRepository.find({ relations: ['books'] });
  }

  findOne(id: string) {
    try {
      return this.usersRepository.findOneOrFail(id, { relations: ['books'] });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  async checkOutBook(userId: string, bookToCheckOut: Book) {
    const user = await this.usersRepository.findOneOrFail(userId, {
      relations: ['books'],
    });

    if (user.books.length >= 4) {
      throw new NotFoundException(
        'One user can only borrow a maximum of 4 book at one time',
      );
    }
    if (bookToCheckOut.available <= 0) {
      throw new NotFoundException('There are no available books');
    } else {
      bookToCheckOut.available--;
    }

    user.books.push(bookToCheckOut);
    this.usersRepository.save(user);
    return user;
  }

  async returnBook(userId: string, bookToReturn: Book) {
    const user = await this.usersRepository.findOneOrFail(userId, {
      relations: ['books'],
    });
    const bookIndex = user.books.findIndex(
      (book) => book.id === bookToReturn.id,
    );

    if (bookIndex === -1) {
      throw new NotFoundException(
        `Book with id ${bookToReturn.id} does not belong to user with id ${userId}`,
      );
    }
    user.books.splice(bookIndex, 1);
    this.usersRepository.save(user);
    bookToReturn.available++;
    return user;
  }
}
