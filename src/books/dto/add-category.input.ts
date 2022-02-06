import { FindBookInput } from './find-book.input';
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class AddCategoryInput {
  @Field(() => FindBookInput)
  findBookInput: FindBookInput;

  @Field(() => ID)
  categoryId: string;
}
