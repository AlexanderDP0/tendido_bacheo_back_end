import { Module } from '@nestjs/common';
import { TramosService } from './tramos.service';
import { TramosController } from './tramos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tramos, TramosSchema } from './tramos.schema';

@Module({
  providers: [TramosService],
  imports: [
    MongooseModule.forFeature([{ name: Tramos.name, schema: TramosSchema }]),
  ],
  controllers: [TramosController],
})
export class TramosModule {}
