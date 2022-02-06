import { CreateAuthorInput } from './create-author.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateAuthorInput extends PartialType(CreateAuthorInput) {
  @Field(() => ID)
  @IsString()
  @IsNotEmpty()
  id: string;
}
