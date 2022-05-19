import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Srsource } from './entities/srsource.entity';

import { CreateSrsourceDto } from './dto/create-srsource.dto';
import { UpdateSrsourceDto } from './dto/update-srsource.dto';

@Injectable()
export class SrsourcesService {
  constructor(
    @InjectRepository(Srsource)
    private srsourcesRepository: Repository<Srsource>
  ) {}

  async create(srsource: CreateSrsourceDto): Promise<Srsource> {
    const newSrsource = this.srsourcesRepository.create(srsource);
    await this.srsourcesRepository.save(newSrsource);
    return newSrsource;
  }

  async findAll(): Promise<Srsource[]> {
    return this.srsourcesRepository.find();
  }

  async findOne(id: number): Promise<Srsource> {
    return this.srsourcesRepository.findOneOrFail(id);
  }

  async update(id: number, updateSrsourceDto: UpdateSrsourceDto): Promise<Srsource> {
    await this.srsourcesRepository.update({ id }, updateSrsourceDto);
    return this.findOne(id);
  }

  async removeAll(): Promise<{ deleted: boolean; message?: string }> {
    try {
      const oldData = await this.findAll();
      for (const entry of oldData) {
        await this.srsourcesRepository.delete(entry.id);
      }
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }

  async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.srsourcesRepository.delete(id);
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
