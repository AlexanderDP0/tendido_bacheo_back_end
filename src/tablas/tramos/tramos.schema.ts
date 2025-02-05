import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema()
export class Tramos {
  @Prop({ required: true })
  largo: number;

  @Prop({ required: true })
  ancho: number;

  @Prop()
  id_baches: string;

  @Prop({ required: true })
  tipo_de_obra: string;

  @Prop({ required: false })
  direccion_in: string;

  @Prop({ required: true })
  direccion_fi: string;

  @Prop()
  id_estado: string;

  @Prop({ required: true })
  costo_total: number;
}

export type TramosDocument = Tramos & Document;
export const TramosSchema = SchemaFactory.createForClass(Tramos);

export class CreateTramosDto {
  readonly largo: number;
  readonly ancho: number;
  readonly id_baches: string;
  readonly tipo_de_obra: string;
  readonly direccion_in: string;
  readonly direccion_fi: string;
  readonly id_estado: string;
  readonly costo_total: number;
}
