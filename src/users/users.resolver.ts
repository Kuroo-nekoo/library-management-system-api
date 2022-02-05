import { BooksService } from './../books/books.service';
import { CheckOutBookInput } from './dto/checkout-book.input';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ValidationPipe, NotFoundException } from '@nestjs/common';
import { Book } from 'src/books/entities/book.entity';
import { ReturnBookInput } from './dto/return-book.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly booksService: BooksService,
  ) {}

  @Mutation(() => User)
  createUser(
    @Args('createUserInput', ValidationPipe) createUserInput: CreateUserInput,
  ) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id') id: string) {
    return this.usersService.remove(id);
  }

  @Mutation(() => User)
  async checkOutBook(
    @Args('checkOutBookInput', ValidationPipe)
    checkOutBookInput: CheckOutBookInput,
  ) {
    const { userId, findBookArgs } = checkOutBookInput;
    const bookToCheckOut = await this.booksService.findOne(findBookArgs);

    return this.usersService.checkOutBook(userId, bookToCheckOut);
  }

  @Mutation(() => Book, { nullable: true })
  async returnBook(
    @Args('returnBookInput', ValidationPipe) returnBookInput: ReturnBookInput,
  ) {
    const { userId, findBookInput } = returnBookInput;
    const bookToReturn = await this.booksService.findOne(findBookInput);

    return this.usersService.returnBook(userId, bookToReturn);
  }
}
