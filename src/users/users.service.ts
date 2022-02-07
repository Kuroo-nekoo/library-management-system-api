import { CheckOutBookInput } from './dto/check-out-book.input';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersRepository } from './users.repository';
import { CheckedOutBooksService } from 'src/checked-out-book/checked-out-books.service';
import { BooksService } from 'src/books/books.service';
import { ReturnBookInput } from './dto/return-book.input';
import { User } from './entities/user.entity';
import { Book } from 'src/books/entities/book.entity';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private readonly booksService: BooksService,
    private readonly checkOutBooksService: CheckedOutBooksService,
  ) {}

  create(createUserInput: CreateUserInput) {
    return this.usersRepository.save(
      this.usersRepository.create(createUserInput),
    );
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: string) {
    try {
      return this.usersRepository.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException("User with id '${id}' does not exist");
    }
  }

  async findCheckedOutBooks(userId: string) {
    try {
      const user = await this.usersRepository.findOneOrFail(userId, {
        relations: ['books'],
      });

      return user.books;
    } catch (error) {
      throw new NotFoundException(`User with id '${userId}' does not exist`);
    }
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    try {
      this.usersRepository.update(id, updateUserInput);
      const updatedUser = await this.usersRepository.findOneOrFail(id);

      return updatedUser;
    } catch (error) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }
  }

  async remove(id: string) {
    try {
      const userToRemove = await this.usersRepository.findOneOrFail(id);
      this.usersRepository.remove(userToRemove);
      return userToRemove;
    } catch (error) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }
  }

  async checkOutBook(checkOutBookInput: CheckOutBookInput) {
    const { userId, findBookInput, checkOutDate, dueDay } = checkOutBookInput;
    let user: User;
    let bookToCheckOut: Book;

    try {
      user = await this.usersRepository.findOneOrFail(userId, {
        relations: ['books'],
      });
    } catch (error) {
      throw new NotFoundException(`User with id ${userId} does not exist`);
    }

    try {
      bookToCheckOut = await this.booksService.findOne(findBookInput);
    } catch (error) {
      throw new NotFoundException(
        `Book with id '${findBookInput.id}' does not exist`,
      );
    }

    if (user.books.length >= 4) {
      throw new NotFoundException(
        'One user can only borrow a maximum of 4 book at one time',
      );
    }

    if (user.books.findIndex((book) => book.id === bookToCheckOut.id) !== -1) {
      throw new NotFoundException('User already has this book');
    }

    if (bookToCheckOut.available <= 0) {
      throw new NotFoundException('There are no available books');
    } else {
      bookToCheckOut.available--;
      this.booksService.save(bookToCheckOut);
    }

    user.books.push(
      await this.checkOutBooksService.create({
        ...bookToCheckOut,
        checkOutDate,
        dueDay: dueDay
          ? dueDay
          : new Date(new Date(checkOutDate).getTime() + 1209600000 + 25200000)
              .toISOString()
              .slice(0, 19)
              .replace('T', ' '),
      }),
    );
    return this.usersRepository.save(user);
  }

  async returnBook(returnBookInput: ReturnBookInput) {
    const { userId, findBookInput } = returnBookInput;

    try {
      const user = await this.usersRepository.findOneOrFail(userId, {
        relations: ['books'],
      });
      const bookToReturn = await this.booksService.findOne(findBookInput);
      const bookIdx = user.books.findIndex(
        (book) => book.id === bookToReturn.id,
      );

      if (bookIdx === -1) {
        throw new NotFoundException(
          `Book with id ${bookToReturn.id} does not belong to user with id ${userId}`,
        );
      }

      user.books.splice(bookIdx, 1);
      bookToReturn.available++;
      this.usersRepository.save(user);
      return user;
    } catch (error) {
      throw new NotFoundException(`User with id ${userId} does not exist`);
    }
  }
}
