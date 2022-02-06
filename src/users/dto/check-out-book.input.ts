import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { InputType } from '@nestjs/graphql';
import { Field, ID } from '@nestjs/graphql';
import { FindBookInput } from 'src/books/dto/find-book.input';

@InputType()
export class CheckOutBookInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsString()
  userId: string;

  @Field(() => FindBookInput)
  findBookInput: FindBookInput;

  @Field()
  @IsNotEmpty()
  // @IsDateString()
  checkOutDate: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  dueDay?: string;
}
