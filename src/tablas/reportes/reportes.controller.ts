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
import { Reporte, CreateReportesDto } from './reportes.schema';
import { ReportesService } from './reportes.service';
@Controller('reportes')
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Post()
  async create(@Body() createReporteDto: CreateReportesDto) {
    return this.reportesService.create(createReporteDto);
  }

  @Get()
  async findAll(): Promise<Reporte[]> {
    return this.reportesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Reporte> {
    return this.reportesService.findByID(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReporteDto: Partial<CreateReportesDto>,
  ): Promise<Reporte> {
    const updatedReporte = await this.reportesService.updateR(
      id,
      updateReporteDto as Partial<Reporte>,
    );
    if (updatedReporte instanceof NotFoundException) {
      throw new NotFoundException(updatedReporte.message);
    }
    if (updatedReporte instanceof BadRequestException) {
      throw new BadRequestException(updatedReporte.message);
    }
    return updatedReporte;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.reportesService.delete(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
