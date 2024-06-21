import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema()
export class Baches {
  @Prop({ required: true })
  profundidad: number;

  @Prop({ required: true })
  largo: number;

  @Prop({ required: true })
  ancho: number;

  @Prop()
  tipo_de_bacheo: string;

  @Prop({ required: true })
  id_clima: string;

  @Prop({ required: false })
  id_estado: string;

  @Prop({ required: true })
  id_materiales: string;
}

export type BachesDocument = Baches & Document;
export const BachesSchema = SchemaFactory.createForClass(Baches);

export class CreateBachesDto {
  readonly profundidad: number;
  readonly largo: number;
  readonly ancho: number;
  readonly tipo_de_bacheo: string;
  readonly id_clima: string;
  readonly id_estado: string;
  readonly id_materiales: string;
}
