import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GenericService } from 'src/generic/generic.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Estado } from './estado.schema';

@Injectable()
export class EstadoService extends GenericService<Estado> {
  constructor(
    @InjectModel(Estado.name) private readonly EModel: Model<Estado>,
  ) {
    super(EModel);
  }

  async createR(estado: Estado): Promise<Estado | BadRequestException> {
    const createdEstado = await this.create(estado);
    if (!createdEstado) {
      return new BadRequestException('Error registrando estado');
    }
    return createdEstado;
  }

  async findAll(): Promise<Estado[]> {
    return this.find();
  }

  async findByID(id: string): Promise<Estado> {
    const estado = await this.findOneById({ id });
    if (!estado) {
      throw new NotFoundException('Estado no encontrado');
    }
    return estado;
  }

  async updateC(
    id: string,
    updateEstadoDto: Partial<Estado>,
  ): Promise<Estado | NotFoundException | BadRequestException> {
    const updatedEstado = await this.update(id, updateEstadoDto);
    if (!updatedEstado) {
      return new NotFoundException(
        'Estado no encontrado o error al actualizar',
      );
    }
    return updatedEstado;
  }

  async deleteC(id: string): Promise<void> {
    const deletedProduct = await this.delete(id);
    if (!deletedProduct) {
      throw new NotFoundException('Estado no encontrado');
    }
  }
}
