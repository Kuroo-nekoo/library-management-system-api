import { FindBookArgs } from './dto/find-book.args';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { ValidationPipe, NotFoundException } from '@nestjs/common';
import { Author } from 'src/authors/entities/author.entity';
import { AuthorsService } from 'src/authors/authors.service';

@Resolver(() => Book)
export class BooksResolver {
  constructor(
    private readonly booksService: BooksService,
    private readonly authorsService: AuthorsService,
  ) {}

  @Mutation(() => Book)
  async createBook(
    @Args('createBookInput', ValidationPipe) createBookInput: CreateBookInput,
  ) {
    try {
      const authors = await this.authorsService.findByIds(
        createBookInput.authorIds,
      );

      return this.booksService.create(createBookInput, authors);
    } catch (error) {
      throw new NotFoundException("Author doesn't exist");
    }
  }

  @Query(() => [Book], { name: 'books' })
  findAll() {
    return this.booksService.findAll();
  }

  @Query(() => Book, { name: 'book' })
  findOne(@Args(ValidationPipe) findBookArgs: FindBookArgs) {
    return this.booksService.findOne(findBookArgs);
  }

  @ResolveField(() => [Author], { name: 'authors' })
  async findBookAuthor(@Parent() { id }: Book) {
    return this.booksService.findBookAuthors(id);
  }

  @Mutation(() => Book)
  updateBook(
    @Args('updateBookInput', ValidationPipe) updateBookInput: UpdateBookInput,
  ) {
    return this.booksService.update(updateBookInput.id, updateBookInput);
  }

  @Mutation(() => Book)
  removeBook(@Args('id') id: string) {
    return this.booksService.remove(id);
  }
}
