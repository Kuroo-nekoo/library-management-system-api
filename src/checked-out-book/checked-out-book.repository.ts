import { CheckedOutBook } from './entities/checked-out-book.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(CheckedOutBook)
export class CheckedOutBookRepository extends Repository<CheckedOutBook> {}
