import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { FindBookArgs } from './find-book.args';

@InputType()
export class FindBookInput extends FindBookArgs {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Field(() => ID, { nullable: true })
  id?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Field({ nullable: true })
  barcode?: string;
}
