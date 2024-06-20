import {
  ArgsType,
  Directive,
  Field,
  GraphQLISODateTime,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

import { Type } from '@nestjs/common';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int)
  @Min(0)
  skip = 0;

  @Field(() => Int)
  @Min(1)
  @Max(50)
  take = 10;
}

export function Paginated<T>(classRef: Type<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [classRef], { nullable: true })
    nodes: T[];

    @Field(() => Int)
    totalCount: number;
  }
  return PaginatedType;
}

export const BCRYPT_WORK_FACTOR = 12;

export abstract class Entity {
  abstract createdAt?: Date;
  abstract updatedAt?: Date;

  abstract deletedAt?: Date;

  static type: string;
}

export interface MongoDBEntityOptions {
  softDelete?: boolean;
  softDeleteOptions?: {
    remove?: string[];
  };
}

@ObjectType({ isAbstract: true })
@Directive('@key(fields: "_id")')
export abstract class MongoDBEntity extends Entity {
  @Field(() => String)
  _id: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Directive('@shareable')
  createdAt?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Directive('@shareable')
  updatedAt?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  deletedAt?: Date;

  static get entityOptions(): MongoDBEntityOptions {
    return {};
  }

  static type = 'mongodb';
}
