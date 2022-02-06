import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { AuthorsModule } from './authors/authors.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path/posix';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core/dist/plugin/landingPage/default';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          entities: ['dist/**/*.entity{.ts,.js}'],
          synchronize: true,
        };
      },
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({
      playground: false,
      autoSchemaFile: join(process.cwd() + '/src/schema.gql'),
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    BooksModule,
    AuthorsModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
  ],
})
export class AppModule {}
