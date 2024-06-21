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
import { Estado, CreateEstadoDto } from './estado.schema';
import { EstadoService } from './estado.service';
@Controller('estado')
export class EstadoController {
  constructor(private readonly estadoService: EstadoService) {}

  @Post()
  async create(@Body() createEstadoDto: CreateEstadoDto) {
    return this.estadoService.create(createEstadoDto);
  }

  @Get()
  async findAll(): Promise<Estado[]> {
    return this.estadoService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Estado> {
    return this.estadoService.findByID(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEstadoDto: Partial<CreateEstadoDto>,
  ): Promise<Estado> {
    const updatedEstado = await this.estadoService.updateC(
      id,
      updateEstadoDto as Partial<Estado>,
    );
    if (updatedEstado instanceof NotFoundException) {
      throw new NotFoundException(updatedEstado.message);
    }
    if (updatedEstado instanceof BadRequestException) {
      throw new BadRequestException(updatedEstado.message);
    }
    return updatedEstado;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.estadoService.delete(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
