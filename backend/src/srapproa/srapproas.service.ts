import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Srapproa } from './entities/srapproa.entity';

import { CreateSrapproaDto } from './dto/create-srapproa.dto';
import { UpdateSrapproaDto } from './dto/update-srapproa.dto';

@Injectable()
export class SrapproasService {
  constructor(
    @InjectRepository(Srapproa)
    private srapproasRepository: Repository<Srapproa>
  ) {}

  async create(srapproa: CreateSrapproaDto): Promise<Srapproa> {
    const newSrapproa = this.srapproasRepository.create(srapproa);
    await this.srapproasRepository.save(newSrapproa);
    return newSrapproa;
  }

  async findAll(): Promise<Srapproa[]> {
    return this.srapproasRepository.find();
  }

  async findOne(id: number): Promise<Srapproa> {
    return this.srapproasRepository.findOneOrFail(id);
  }

  async update(id: number, updateSrapproaDto: UpdateSrapproaDto): Promise<Srapproa> {
    await this.srapproasRepository.update({ id }, updateSrapproaDto);
    return this.findOne(id);
  }

  async removeAll(): Promise<{ deleted: boolean; message?: string }> {
    try {
      const oldData = await this.findAll();
      for (const entry of oldData) {
        await this.srapproasRepository.delete(entry.id);
      }
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }

  async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.srapproasRepository.delete(id);
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
