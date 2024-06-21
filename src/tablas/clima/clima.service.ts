import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GenericService } from 'src/generic/generic.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Clima } from './clima.schema';

@Injectable()
export class ClimaService extends GenericService<Clima> {
  constructor(@InjectModel(Clima.name) private readonly CModel: Model<Clima>) {
    super(CModel);
  }

  async createR(clima: Clima): Promise<Clima | BadRequestException> {
    const createdClima = await this.create(clima);
    if (!createdClima) {
      return new BadRequestException('Error registrando clima');
    }
    return createdClima;
  }

  async findAll(): Promise<Clima[]> {
    return this.find();
  }

  async findByID(id: string): Promise<Clima> {
    const clima = await this.findOneById({ id });
    if (!clima) {
      throw new NotFoundException('Clima no encontrado');
    }
    return clima;
  }

  async updateC(
    id: string,
    updateClimaDto: Partial<Clima>,
  ): Promise<Clima | NotFoundException | BadRequestException> {
    const updatedClima = await this.update(id, updateClimaDto);
    if (!updatedClima) {
      return new NotFoundException('Clima no encontrado o error al actualizar');
    }
    return updatedClima;
  }

  async deleteC(id: string): Promise<void> {
    const deletedProduct = await this.delete(id);
    if (!deletedProduct) {
      throw new NotFoundException('Clima no encontrado');
    }
  }
}
