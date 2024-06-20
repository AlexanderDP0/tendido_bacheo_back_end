import { registerEnumType } from '@nestjs/graphql';

export enum Rol {
  SuperAdmin = `SuperAdmin`,
  Admin = `Admin`,
  User = `User`,
  Prospect = `Prospect`,
}

registerEnumType(Rol, {
  name: 'Rol',
  description: 'User rol',
});
