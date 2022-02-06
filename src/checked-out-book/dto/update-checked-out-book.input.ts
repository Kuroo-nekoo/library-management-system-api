import { CreateCheckedOutBookInput } from './create-checked-out-book.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCheckedOutBookInput extends PartialType(
  CreateCheckedOutBookInput,
) {
  @Field(() => Int)
  id: number;
}
