import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema()
export class Reporte {
  @Prop({ required: true })
  id_tramo: string;
}

export type ReportesDocument = Reporte & Document;
export const ReportesSchema = SchemaFactory.createForClass(Reporte);

export class CreateReportesDto {
  readonly id_tramo: string;
}
