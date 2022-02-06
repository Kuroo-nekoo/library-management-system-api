import { Entity } from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class CheckedOutBook extends Book {}
