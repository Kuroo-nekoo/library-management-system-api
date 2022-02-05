import { BooksModule } from './../books/books.module';
import { AuthorRepository } from './author.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsResolver } from './authors.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorRepository]),
    forwardRef(() => BooksModule),
  ],
  providers: [AuthorsResolver, AuthorsService],
  exports: [AuthorsService],
})
export class AuthorsModule {}
