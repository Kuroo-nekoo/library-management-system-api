import { AuthorRepository } from './author.repository';
import { ConsoleLogger, Injectable, NotFoundException } from '@nestjs/common';
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
    const author = this.authorRepository.findOneOrFail(id).catch((error) => {
      throw new NotFoundException("Author test doesn't exist!");
    });

    return author;
  }

  findByIds(authorIds: string[]) {
    return this.authorRepository.findByIds(authorIds).catch((error) => {
      throw new NotFoundException("Author doesn't exist!");
    });
  }

  async findBooksOfAuthor(authorId: string) {
    const author = await this.authorRepository
      .findOneOrFail(authorId, {
        relations: ['books'],
      })
      .catch((error) => {
        throw new NotFoundException("Author doesn't exist!");
      });

    return author.books;
  }

  async update(id: string, updateAuthorInput: UpdateAuthorInput) {
    await this.authorRepository.update(id, updateAuthorInput);
    const updatedAuthor = await this.authorRepository
      .findOneOrFail(id)
      .catch((error) => {
        throw new NotFoundException("Author doesn't exist!");
      });

    return updatedAuthor;
  }

  async remove(id: string) {
    const authorToRemove = await this.authorRepository
      .findOneOrFail(id)
      .catch((error) => {
        throw new NotFoundException("Author doesn't exist!");
      });

    this.authorRepository.remove(authorToRemove);
    return authorToRemove;
  }
}
