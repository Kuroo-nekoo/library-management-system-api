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
      throw new NotFoundException("User with id '${userId}' does not exist");
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

  async checkOutBook(userId: string, bookToCheckOut: Book) {
    const user = await this.usersRepository
      .findOneOrFail(userId, {
        relations: ['books'],
      })
      .catch((error) => {
        throw new NotFoundException(`User with id ${userId} does not exist`);
      });

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
    }

    user.books.push(bookToCheckOut);
    return this.usersRepository.save(user);
  }

  async returnBook(userId: string, bookToReturn: Book) {
    const user = await this.usersRepository
      .findOneOrFail(userId, {
        relations: ['books'],
      })
      .catch((error) => {
        throw new NotFoundException(`User with id ${userId} does not exist`);
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
    bookToReturn.available++;
    this.usersRepository.save(user);
    return user;
  }
}
