import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { join } from 'path';
import { ProjectResolver } from './project/project.resolver';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ProjectEntity } from './project.entity';
import { TechnologyEntity } from './technology.entity';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: true,
      playground: true
    }),
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([ProjectEntity, TechnologyEntity])
  ],
  providers: [ProjectResolver],
})

export class AppModule {
  constructor(private connection: Connection) {}
}
