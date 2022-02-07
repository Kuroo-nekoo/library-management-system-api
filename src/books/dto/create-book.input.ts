import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateBookInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  barcode: string;

  @Field()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  frontImg: string;

  @Field()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  backImg: string;

  @Field(() => [String])
  @IsNotEmpty()
  @IsString({ each: true })
  authorIds: string[];
}
