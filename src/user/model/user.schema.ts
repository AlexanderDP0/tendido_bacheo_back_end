import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';
import { Rol } from './user.enum';

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  avatar?: string;

  @Prop({ required: false })
  rol?: Rol;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
