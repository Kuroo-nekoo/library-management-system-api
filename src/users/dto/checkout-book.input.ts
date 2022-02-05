import { InputType } from '@nestjs/graphql';
import { Field, ID } from '@nestjs/graphql';
import { FindBookInput } from 'src/books/dto/find-book.input';

@InputType()
export class CheckOutBookInput {
  @Field(() => ID)
  userId: string;

  @Field(() => FindBookInput)
  findBookArgs: FindBookInput;
}
