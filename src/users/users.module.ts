import { CheckedOutBookModule } from './../checked-out-book/checked-out-books.module';
import { BooksModule } from './../books/books.module';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
    BooksModule,
    CheckedOutBookModule,
  ],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
