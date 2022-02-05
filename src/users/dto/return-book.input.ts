import { FindBookInput } from './../../books/dto/find-book.input';
import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class ReturnBookInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsString()
  userId: string;

  @Field(() => FindBookInput)
  @IsNotEmpty()
  findBookInput: FindBookInput;
}
