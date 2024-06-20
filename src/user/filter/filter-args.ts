import { Field, InputType } from '@nestjs/graphql';

import { FilterQuery } from 'mongoose';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class FilterOneArgs<T> {
  @Field(() => GraphQLJSONObject, { nullable: true })
  where?: FilterQuery<T>;

  @Field(() => String, { nullable: true })
  id?: string;
}

@InputType()
export class FilterArgs<T> {
  @Field(() => GraphQLJSONObject, { nullable: true })
  where?: FilterQuery<T>;

  @Field(() => String, { nullable: true })
  search?: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  sort?: { [P in keyof T]?: 1 | -1 };

  @Field({ defaultValue: 0 })
  skip: number;

  @Field({ defaultValue: 10 })
  limit: number;
}
