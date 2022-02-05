import { BookRepository } from './book.repository';
import { forwardRef, Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsModule } from 'src/authors/authors.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookRepository]),
    forwardRef(() => AuthorsModule),
  ],
  providers: [BooksResolver, BooksService],
  exports: [BooksService],
})
export class BooksModule {}
