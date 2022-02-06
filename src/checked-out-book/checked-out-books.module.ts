import { CheckedOutBookRepository } from './checked-out-book.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckedOutBooksService } from './checked-out-books.service';
import { CheckedOutBooksResolver } from './checked-out-books.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CheckedOutBookRepository])],
  providers: [CheckedOutBooksResolver, CheckedOutBooksService],
  exports: [CheckedOutBooksService],
})
export class CheckedOutBookModule {}
