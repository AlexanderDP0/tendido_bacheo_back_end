import { Module } from '@nestjs/common';
import { BachesService } from './baches.service';
import { BachesController } from './baches.controller';

@Module({
  providers: [BachesService],
  controllers: [BachesController],
})
export class BachesModule {}
