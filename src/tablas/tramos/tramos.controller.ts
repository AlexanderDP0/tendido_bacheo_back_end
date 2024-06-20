import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  NotFoundException,
  Put,
  BadRequestException,
} from '@nestjs/common';
import { TramosService } from './tramos.service';
import { Tramos, CreateTramosDto } from './tramos.schema';

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

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTramosDto: Partial<CreateTramosDto>,
  ): Promise<Tramos> {
    const updatedTramos = await this.tramosService.updateTramo(
      id,
      updateTramosDto as Partial<Tramos>,
    );
    if (updatedTramos instanceof NotFoundException) {
      throw new NotFoundException(updatedTramos.message);
    }
    if (updatedTramos instanceof BadRequestException) {
      throw new BadRequestException(updatedTramos.message);
    }
    return updatedTramos;
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
