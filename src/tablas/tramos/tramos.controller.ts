import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { TramosService } from './tramos.service';
import { CreateTramosDto } from './create-tramos.dto';
import { Tramos } from './tramos.schema';

@Controller('tramos')
export class TramosController {
  constructor(private readonly tramosService: TramosService) {}

  @Post()
  async create(@Body() createTramosDto: CreateTramosDto) {
    return this.tramosService.create(createTramosDto);
  }

  @Get()
  async findAll(): Promise<Tramos[]> {
    return this.tramosService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Tramos> {
    return this.tramosService.findByID(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.tramosService.delete(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
