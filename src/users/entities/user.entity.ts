import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Book } from 'src/books/entities/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column()
  name: string;

  @Field(() => [Book])
  @OneToMany(() => Book, (book) => book.user, { cascade: true })
  books: Book[];
}
