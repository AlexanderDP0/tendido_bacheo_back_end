import { Module } from '@nestjs/common';
import { MaterialesService } from './materiales.service';
import { MaterialesController } from './materiales.controller';
import { Material, MaterialesSchema } from './materiales.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [MaterialesService],
  imports: [
    MongooseModule.forFeature([
      { name: Material.name, schema: MaterialesSchema },
    ]),
  ],
  controllers: [MaterialesController],
})
export class MaterialesModule {}
