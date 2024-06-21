import { Module } from '@nestjs/common';
import { ClimaService } from './clima.service';
import { ClimaController } from './clima.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Clima, ClimaSchema } from './clima.schema';

@Module({
  providers: [ClimaService],
  imports: [
    MongooseModule.forFeature([{ name: Clima.name, schema: ClimaSchema }]),
  ],
  controllers: [ClimaController],
})
export class ClimaModule {}
