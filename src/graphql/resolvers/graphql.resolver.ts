import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PaginatedUser, UserGql, UserInput } from 'src/user/model';
import { BadRequestException } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { FilterArgs, FilterOneArgs } from 'src/user/filter';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/model';
const MODEL = 'cat';
@Resolver('GraphQL')
export class GraphQLResolver {
  constructor(private readonly service: UserService) {}

  @Query(() => UserGql)
  async user(
    @Args('filter') filter?: FilterOneArgs<User>,
  ): Promise<User | BadRequestException> {
    const entity = await this.service.findOneById(filter);
    if (!entity) {
      return new BadRequestException(`${MODEL} not found`);
    }
    return entity;
  }

  @Query(() => PaginatedUser)
  async users(
    @Args('filter', { nullable: true }) filter?: FilterArgs<User>,
  ): Promise<PaginatedUser> {
    const where = filter && filter.where ? filter.where : {};
    const [nodes, totalCount] = await Promise.all([
      this.service.find(where, {
        skip: filter?.skip,
        limit: filter?.limit,
        sort: filter?.sort,
      }),
      this.service.count(where as FilterQuery<User>),
    ]);
    return { nodes, totalCount };
  }

  @Mutation(() => UserGql)
  async createU(
    @Args('user') userInput: UserInput,
  ): Promise<User | BadRequestException> {
    const user: User = {
      // Map UserInput properties to User properties
      firstName: userInput.firstName,
      lastName: userInput.lastName,
      email: userInput.email,
      password: userInput.password,
    };
    return await this.service.createUser(user);
  }

  @Mutation(() => UserGql)
  async deleteUser(
    @Args('id') id: string,
  ): Promise<User | BadRequestException> {
    const entity = await this.service.delete(id);
    if (!entity) {
      return new BadRequestException(`Error deleting ${MODEL}`);
    }
    return entity;
  }
}
