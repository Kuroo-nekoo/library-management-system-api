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
      const author = this.authorRepository.findOneOrFail(id);

      return author;
    } catch (err) {
      throw new NotFoundException("Author test doesn't exist!");
    }
  }

  findByIds(authorIds: string[]) {
    const author = this.authorRepository.findByIds(authorIds);
    return author;
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

  async update(id: string, updateAuthorInput: UpdateAuthorInput) {
    try {
      await this.authorRepository.update(id, updateAuthorInput);
      const updatedAuthor = await this.authorRepository.findOneOrFail(id);

      return updatedAuthor;
    } catch (error) {
      throw new NotFoundException("Author doesn't exist!");
    }
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
