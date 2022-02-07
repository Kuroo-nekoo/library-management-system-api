import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { Book } from 'src/books/entities/book.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Category {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @Column()
  value: string;

  @Field(() => [Book])
  @ManyToMany(() => Book, (book) => book.categories, { cascade: true })
  books: Book[];
}
