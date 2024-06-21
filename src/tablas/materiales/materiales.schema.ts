import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema()
export class Material {
  @Prop({ required: true })
  material: string;

  @Prop({ required: true })
  cantidad: number;

  @Prop({ required: true })
  costo: number;
}

export type MaterialesDocument = Material & Document;
export const MaterialesSchema = SchemaFactory.createForClass(Material);

export class CreateMaterialesDto {
  readonly material: string;
  readonly cantidad: number;
  readonly costo: number;
}
