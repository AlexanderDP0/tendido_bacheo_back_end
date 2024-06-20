import { Field, ObjectType } from '@nestjs/graphql';
import { MongoDBEntity, Paginated } from 'src/generic/generic.model';

import { Rol } from './user.enum';

@ObjectType({ description: 'user' })
export class UserGql extends MongoDBEntity {
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String, { nullable: true })
  avatar?: string;

  @Field(() => Rol, { defaultValue: Rol.Prospect })
  rol: Rol;
}

@ObjectType()
export class PaginatedUser extends Paginated(UserGql) {}
