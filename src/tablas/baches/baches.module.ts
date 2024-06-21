import { Module } from '@nestjs/common';
import { BachesService } from './baches.service';
import { BachesController } from './baches.controller';
import { Baches, BachesSchema } from './baches.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [BachesService],
  imports: [
    MongooseModule.forFeature([{ name: Baches.name, schema: BachesSchema }]),
  ],
  controllers: [BachesController],
})
export class BachesModule {}
