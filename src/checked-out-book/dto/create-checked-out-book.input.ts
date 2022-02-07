import { CreateBookInput } from './../../books/dto/create-book.input';
import { InputType, Field, OmitType } from '@nestjs/graphql';
import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateCheckedOutBookInput extends OmitType(CreateBookInput, [
  'authorIds',
]) {
  @Field()
  @IsDateString()
  @IsNotEmpty()
  checkOutDate: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  dueDay?: string;
}
