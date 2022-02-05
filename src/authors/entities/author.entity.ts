import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Book } from 'src/books/entities/book.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Author {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field(() => Int)
  @Column()
  age: number;

  @Field(() => [Book])
  @ManyToMany(() => Book, (book) => book.authors)
  @JoinTable()
  books: Book[];
}
