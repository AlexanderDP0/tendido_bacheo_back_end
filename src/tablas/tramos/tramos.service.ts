import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GenericService } from 'src/generic/generic.service';
import { Tramos } from './tramos.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TramosService extends GenericService<Tramos> {
  constructor(
    @InjectModel(Tramos.name) private readonly TModel: Model<Tramos>,
  ) {
    super(TModel);
  }

  async createT(tramos: Tramos): Promise<Tramos | BadRequestException> {
    const createdTramos = await this.create(tramos);
    if (!createdTramos) {
      return new BadRequestException('Error registrando tramo');
    }
    return createdTramos;
  }

  async findAll(): Promise<Tramos[]> {
    return this.find();
  }

  async findByID(id: string): Promise<Tramos> {
    const tramo = await this.findOneById({ id });
    if (!tramo) {
      throw new NotFoundException('Tramo no encontrado');
    }
    return tramo;
  }

  async deleteTramo(id: string): Promise<void> {
    const deletedProduct = await this.delete(id);
    if (!deletedProduct) {
      throw new NotFoundException('User not found');
    }
  }
}
