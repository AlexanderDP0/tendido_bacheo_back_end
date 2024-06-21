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
import { Material, CreateMaterialesDto } from './materiales.schema';
import { MaterialesService } from './materiales.service';

@Controller('materiales')
export class MaterialesController {
  constructor(private readonly materialesService: MaterialesService) {}

  @Post()
  async create(@Body() createMaterialesDto: CreateMaterialesDto) {
    return this.materialesService.create(createMaterialesDto);
  }

  @Get()
  async findAll(): Promise<Material[]> {
    return this.materialesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Material> {
    return this.materialesService.findByID(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBachesDto: Partial<CreateMaterialesDto>,
  ): Promise<Material> {
    const updateMaterial = await this.materialesService.updateM(
      id,
      updateBachesDto as Partial<Material>,
    );
    if (updateMaterial instanceof NotFoundException) {
      throw new NotFoundException(updateMaterial.message);
    }
    if (updateMaterial instanceof BadRequestException) {
      throw new BadRequestException(updateMaterial.message);
    }
    return updateMaterial;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.materialesService.delete(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
