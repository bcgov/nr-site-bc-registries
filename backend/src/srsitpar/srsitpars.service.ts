import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Srsitpar } from './entities/srsitpar.entity';

import { CreateSrsitparDto } from './dto/create-srsitpar.dto';
import { UpdateSrsitparDto } from './dto/update-srsitpar.dto';

@Injectable()
export class SrsitparsService {
  constructor(
    @InjectRepository(Srsitpar)
    private srsitparsRepository: Repository<Srsitpar>
  ) {}

  async create(srsitpar: CreateSrsitparDto): Promise<Srsitpar> {
    const newSrsitpar = this.srsitparsRepository.create(srsitpar);
    await this.srsitparsRepository.save(newSrsitpar);
    return newSrsitpar;
  }

  async findAll(): Promise<Srsitpar[]> {
    return this.srsitparsRepository.find();
  }

  async findOne(id: number): Promise<Srsitpar> {
    return this.srsitparsRepository.findOneOrFail(id);
  }

  async update(id: number, updateSrsitparDto: UpdateSrsitparDto): Promise<Srsitpar> {
    await this.srsitparsRepository.update({ id }, updateSrsitparDto);
    return this.findOne(id);
  }

  async removeAll(): Promise<{ deleted: boolean; message?: string }> {
    try {
      const oldData = await this.findAll();
      for (const entry of oldData) {
        await this.srsitparsRepository.delete(entry.id);
      }
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }

  async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.srsitparsRepository.delete(id);
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
