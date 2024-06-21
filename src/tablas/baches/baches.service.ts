import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GenericService } from 'src/generic/generic.service';
import { Baches } from './baches.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BachesService extends GenericService<Baches> {
  constructor(
    @InjectModel(Baches.name) private readonly BModel: Model<Baches>,
  ) {
    super(BModel);
  }

  async createB(baches: Baches): Promise<Baches | BadRequestException> {
    const createdBaches = await this.create(baches);
    if (!createdBaches) {
      return new BadRequestException('Error registrando tramo');
    }
    return createdBaches;
  }

  async findAll(): Promise<Baches[]> {
    return this.find();
  }

  async findByID(id: string): Promise<Baches> {
    const baches = await this.findOneById({ id });
    if (!baches) {
      throw new NotFoundException('Bache no encontrado');
    }
    return baches;
  }

  async updateBache(
    id: string,
    updateBachesDto: Partial<Baches>,
  ): Promise<Baches | NotFoundException | BadRequestException> {
    const updatedBaches = await this.update(id, updateBachesDto);
    if (!updatedBaches) {
      return new NotFoundException('Bache no encontrado o error al actualizar');
    }
    return updatedBaches;
  }

  async deleteBache(id: string): Promise<void> {
    const deletedProduct = await this.delete(id);
    if (!deletedProduct) {
      throw new NotFoundException('Bache not found');
    }
  }
}
