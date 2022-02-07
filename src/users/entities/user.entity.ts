import { CheckedOutBook } from './../../checked-out-book/entities/checked-out-book.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
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

  @Field(() => [CheckedOutBook])
  @OneToMany(() => CheckedOutBook, (book) => book.user, { cascade: true })
  books: CheckedOutBook[];
}
