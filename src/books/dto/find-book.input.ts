import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { FindBookArgs } from './find-book.args';

@InputType()
export class FindBookInput extends FindBookArgs {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  barcode?: string;
}
