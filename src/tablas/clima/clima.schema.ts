import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Clima {
  @Prop({ required: true })
  humedad: number;

  @Prop({ required: true })
  temperatura: number;
}

export type ClimaDocument = Clima & Document;
export const ClimaSchema = SchemaFactory.createForClass(Clima);

export class CreateClimaDto {
  readonly humedad: number;
  readonly temperatura: number;
}
