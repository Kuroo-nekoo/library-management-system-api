import { User } from './../../users/entities/user.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Author } from 'src/authors/entities/author.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Book {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  barcode: string;

  @Field(() => Author)
  @ManyToMany(() => Author, (author) => author.books)
  authors: Author[];

  @ManyToOne(() => User, (user) => user.books)
  user: User;
}
