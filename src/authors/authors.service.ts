import { AuthorRepository } from './author.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';

@Injectable()
export class AuthorsService {
  constructor(private authorRepository: AuthorRepository) {}

  create(createAuthorInput: CreateAuthorInput) {
    return this.authorRepository.save(
      this.authorRepository.create(createAuthorInput),
    );
  }

  findAll() {
    return this.authorRepository.find();
  }

  findOne(id: string) {
    try {
      return this.authorRepository.findOne(id);
    } catch (error) {
      throw new NotFoundException("Author doesn't exist!");
    }
  }

  findByIds(authorIds: string[]) {
    try {
      return this.authorRepository.findByIds(authorIds);
    } catch (error) {
      throw new NotFoundException("Author doesn't exist!");
    }
  }

  async findBooksOfAuthor(authorId: string) {
    try {
      const author = await this.authorRepository.findOneOrFail(authorId, {
        relations: ['books'],
      });

      return author.books;
    } catch (error) {
      throw new NotFoundException("Author doesn't exist!");
    }
  }

  update(id: number, updateAuthorInput: UpdateAuthorInput) {
    return `This action updates a #${id} author`;
  }

  async remove(id: string) {
    try {
      const authorToRemove = await this.authorRepository.findOneOrFail(id);

      this.authorRepository.remove(authorToRemove);
      return authorToRemove;
    } catch (error) {
      throw new NotFoundException("Author doesn't exist!");
    }
  }
}
