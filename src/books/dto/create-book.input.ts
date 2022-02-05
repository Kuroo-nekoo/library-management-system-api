import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { Author } from 'src/authors/entities/author.entity';

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

  @Field(() => [String])
  @IsNotEmpty()
  @IsString({ each: true })
  authorIds: string[];
}
