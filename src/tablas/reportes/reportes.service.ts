import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GenericService } from 'src/generic/generic.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reporte } from './reportes.schema';

@Injectable()
export class ReportesService extends GenericService<Reporte> {
  constructor(
    @InjectModel(Reporte.name) private readonly RModel: Model<Reporte>,
  ) {
    super(RModel);
  }

  async createR(reporte: Reporte): Promise<Reporte | BadRequestException> {
    const createdReporte = await this.create(reporte);
    if (!createdReporte) {
      return new BadRequestException('Error registrando reporte');
    }
    return createdReporte;
  }

  async findAll(): Promise<Reporte[]> {
    return this.find();
  }

  async findByID(id: string): Promise<Reporte> {
    const reporte = await this.findOneById({ id });
    if (!reporte) {
      throw new NotFoundException('Reporte no encontrado');
    }
    return reporte;
  }

  async updateR(
    id: string,
    updateReporteDto: Partial<Reporte>,
  ): Promise<Reporte | NotFoundException | BadRequestException> {
    const updatedReporte = await this.update(id, updateReporteDto);
    if (!updatedReporte) {
      return new NotFoundException(
        'Reporte no encontrado o error al actualizar',
      );
    }
    return updatedReporte;
  }

  async deleteR(id: string): Promise<void> {
    const deletedProduct = await this.delete(id);
    if (!deletedProduct) {
      throw new NotFoundException('Reporte no encontrado');
    }
  }
}
