import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GenericService } from 'src/generic/generic.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Material } from './materiales.schema';

@Injectable()
export class MaterialesService extends GenericService<Material> {
  constructor(
    @InjectModel(Material.name) private readonly MModel: Model<Material>,
  ) {
    super(MModel);
  }

  async createM(material: Material): Promise<Material | BadRequestException> {
    const createdMaterial = await this.create(material);
    if (!createdMaterial) {
      return new BadRequestException('Error registrando material');
    }
    return createdMaterial;
  }

  async findAll(): Promise<Material[]> {
    return this.find();
  }

  async findByID(id: string): Promise<Material> {
    const material = await this.findOneById({ id });
    if (!material) {
      throw new NotFoundException('Material no encontrado');
    }
    return material;
  }

  async updateM(
    id: string,
    updateMaterialDto: Partial<Material>,
  ): Promise<Material | NotFoundException | BadRequestException> {
    const updatedMaterial = await this.update(id, updateMaterialDto);
    if (!updatedMaterial) {
      return new NotFoundException(
        'Material no encontrado o error al actualizar',
      );
    }
    return updatedMaterial;
  }

  async deleteM(id: string): Promise<void> {
    const deletedProduct = await this.delete(id);
    if (!deletedProduct) {
      throw new NotFoundException('Material not found');
    }
  }
}
