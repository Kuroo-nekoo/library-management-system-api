import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@ArgsType()
export class FindBookArgs {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Field(() => ID, { nullable: true })
  bookId?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Field({ nullable: true })
  barcode?: string;
}
