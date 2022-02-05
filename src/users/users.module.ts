import { BooksModule } from './../books/books.module';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository]), BooksModule],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
