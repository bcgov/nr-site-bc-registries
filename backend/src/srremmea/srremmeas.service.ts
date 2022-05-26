import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Srremmea } from './entities/srremmea.entity';

import { CreateSrremmeaDto } from './dto/create-srremmea.dto';
import { UpdateSrremmeaDto } from './dto/update-srremmea.dto';

@Injectable()
export class SrremmeasService {
  constructor(
    @InjectRepository(Srremmea)
    private srremmeasRepository: Repository<Srremmea>
  ) {}

  async create(srremmea: CreateSrremmeaDto): Promise<Srremmea> {
    const newSrremmea = this.srremmeasRepository.create(srremmea);
    await this.srremmeasRepository.save(newSrremmea);
    return newSrremmea;
  }

  async findAll(): Promise<Srremmea[]> {
    return this.srremmeasRepository.find();
  }

  async findOne(id: number): Promise<Srremmea> {
    return this.srremmeasRepository.findOneOrFail(id);
  }

  async update(id: number, updateSrremmeaDto: UpdateSrremmeaDto): Promise<Srremmea> {
    await this.srremmeasRepository.update({ id }, updateSrremmeaDto);
    return this.findOne(id);
  }

  async removeAll(): Promise<{ deleted: boolean; message?: string }> {
    try {
      const oldData = await this.findAll();
      for (const entry of oldData) {
        await this.srremmeasRepository.delete(entry.id);
      }
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }

  async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.srremmeasRepository.delete(id);
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
