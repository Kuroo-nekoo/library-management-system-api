import { Field, ObjectType } from '@nestjs/graphql';
import { Book } from 'src/books/entities/book.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@ObjectType()
@Entity()
export class CheckedOutBook extends Book {
  @Field()
  @Column()
  checkOutDate: string;

  @Field()
  @Column({ nullable: true })
  dueDay: string;

  @ManyToOne(() => User, (user) => user.books)
  user: User;
}
