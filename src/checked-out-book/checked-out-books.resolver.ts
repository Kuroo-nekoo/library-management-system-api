import { CheckedOutBooksService } from 'src/checked-out-book/checked-out-books.service';
import { ValidationPipe } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CheckedOutBook } from './entities/checked-out-book.entity';
import { CreateCheckedOutBookInput } from './dto/create-checked-out-book.input';
import { UpdateCheckedOutBookInput } from './dto/update-checked-out-book.input';

@Resolver(() => CheckedOutBook)
export class CheckedOutBooksResolver {
  constructor(private readonly checkedOutBookService: CheckedOutBooksService) {}

  createCheckedOutBook(
    @Args('createCheckedOutBookInput', ValidationPipe)
    createCheckedOutBookInput: CreateCheckedOutBookInput,
  ) {
    return this.checkedOutBookService.create(createCheckedOutBookInput);
  }

  @Query(() => [CheckedOutBook], { name: 'checkedOutBook' })
  findAll() {
    return this.checkedOutBookService.findAll();
  }

  @Mutation(() => CheckedOutBook)
  updateCheckedOutBook(
    @Args('updateCheckedOutBookInput')
    updateCheckedOutBookInput: UpdateCheckedOutBookInput,
  ) {
    return this.checkedOutBookService.update(
      updateCheckedOutBookInput.id,
      updateCheckedOutBookInput,
    );
  }

  @Mutation(() => CheckedOutBook)
  removeCheckedOutBook(@Args('id', { type: () => ID }) id: string) {
    return this.checkedOutBookService.remove(id);
  }
}
