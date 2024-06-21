import { Module } from '@nestjs/common';
import { EstadoService } from './estado.service';
import { EstadoController } from './estado.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Estado, EstadoSchema } from './estado.schema';

@Module({
  providers: [EstadoService],
  imports: [
    MongooseModule.forFeature([{ name: Estado.name, schema: EstadoSchema }]),
  ],
  controllers: [EstadoController],
})
export class EstadoModule {}
