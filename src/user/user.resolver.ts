import { BadRequestException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FilterQuery } from 'mongoose';
import { FilterArgs, FilterOneArgs } from 'src/user/filter';
import { LoginInput, PaginatedUser, User, UserGql, UserInput } from './model';
import { UserService } from './user.service';

const MODEL = 'user';
@Resolver(() => UserGql)
export class UserResolver {
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
  async createUser(
    @Args('entity') entityInput: UserInput,
  ): Promise<User | BadRequestException> {
    return await this.service.createUser(entityInput);
  }

  @Mutation(() => UserGql)
  async updateUser(
    @Args('id') id: string,
    @Args('entity') entityInput: UserInput,
  ): Promise<User | BadRequestException> {
    const entity = await this.service.update(id, entityInput);
    if (!entity) {
      return new BadRequestException(`Error updating ${MODEL}`);
    }
    return entity;
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

  @Mutation(() => UserGql)
  async login(
    @Args('entity') loginEntity: LoginInput,
  ): Promise<User | BadRequestException> {
    const { payload, match } = await this.service.login(loginEntity);
    if (!match) {
      return new BadRequestException(`Incorrect user or password`);
    }

    if (!payload) {
      return new BadRequestException(`Error getting ${MODEL}`);
    }
    return payload;
  }
}
