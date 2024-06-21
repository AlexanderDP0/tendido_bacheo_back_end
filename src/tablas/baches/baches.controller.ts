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
import { Baches, CreateBachesDto } from './baches.schema';
import { BachesService } from './baches.service';

@Controller('baches')
export class BachesController {
  constructor(private readonly bachesService: BachesService) {}

  @Post()
  async create(@Body() createBachesDto: CreateBachesDto) {
    return this.bachesService.create(createBachesDto);
  }

  @Get()
  async findAll(): Promise<Baches[]> {
    return this.bachesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Baches> {
    return this.bachesService.findByID(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBachesDto: Partial<CreateBachesDto>,
  ): Promise<Baches> {
    const updateBache = await this.bachesService.updateBache(
      id,
      updateBachesDto as Partial<Baches>,
    );
    if (updateBache instanceof NotFoundException) {
      throw new NotFoundException(updateBache.message);
    }
    if (updateBache instanceof BadRequestException) {
      throw new BadRequestException(updateBache.message);
    }
    return updateBache;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.bachesService.delete(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
