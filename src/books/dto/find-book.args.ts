import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@ArgsType()
export class FindBookArgs {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Field(() => ID, { nullable: true })
  id?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Field(() => ID, { nullable: true })
  barcode?: string;
}
