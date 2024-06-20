import { Module } from '@nestjs/common';
import { MaterialesService } from './materiales.service';
import { MaterialesController } from './materiales.controller';

@Module({
  providers: [MaterialesService],
  controllers: [MaterialesController],
})
export class MaterialesModule {}
