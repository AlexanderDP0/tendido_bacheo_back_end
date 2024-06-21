import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Estado {
  @Prop({ required: true })
  estado: string;
}

export type EstadoDocument = Estado & Document;
export const EstadoSchema = SchemaFactory.createForClass(Estado);

export class CreateEstadoDto {
  readonly estado: string;
}
