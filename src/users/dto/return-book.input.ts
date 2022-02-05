import { FindBookInput } from './../../books/dto/find-book.input';
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class ReturnBookInput {
  @Field(() => ID)
  userId: string;

  @Field(() => FindBookInput)
  findBookInput: FindBookInput;
}
