import { Module } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { ReportesController } from './reportes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reporte, ReportesSchema } from './reportes.schema';

@Module({
  providers: [ReportesService],
  imports: [
    MongooseModule.forFeature([{ name: Reporte.name, schema: ReportesSchema }]),
  ],
  controllers: [ReportesController],
})
export class ReportesModule {}
