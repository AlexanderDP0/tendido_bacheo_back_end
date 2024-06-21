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
import { Clima, CreateClimaDto } from './clima.schema';
import { ClimaService } from './clima.service';

@Controller('clima')
export class ClimaController {
  constructor(private readonly climaService: ClimaService) {}

  @Post()
  async create(@Body() createClimaDto: CreateClimaDto) {
    return this.climaService.create(createClimaDto);
  }

  @Get()
  async findAll(): Promise<Clima[]> {
    return this.climaService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Clima> {
    return this.climaService.findByID(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClimaDto: Partial<CreateClimaDto>,
  ): Promise<Clima> {
    const updatedClima = await this.climaService.updateC(
      id,
      updateClimaDto as Partial<Clima>,
    );
    if (updatedClima instanceof NotFoundException) {
      throw new NotFoundException(updatedClima.message);
    }
    if (updatedClima instanceof BadRequestException) {
      throw new BadRequestException(updatedClima.message);
    }
    return updatedClima;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.climaService.delete(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
