import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Author } from 'src/authors/entities/author.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';

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

  @Field(() => Int)
  @Column()
  available: number;

  @Field()
  @Column({ nullable: true })
  frontImg: string;

  @Field()
  @Column({ nullable: true })
  backImg: string;

  @Field(() => [Category])
  @ManyToMany(() => Author, (author) => author.books)
  categories: Category[];

  @Field(() => [Author])
  @ManyToMany(() => Author, (author) => author.books)
  authors: Author[];
}
