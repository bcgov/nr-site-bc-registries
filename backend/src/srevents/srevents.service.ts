import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Srevent } from './entities/srevent.entity';

import { CreateSreventDto } from './dto/create-srevent.dto';
import { UpdateSreventDto } from './dto/update-srevent.dto';

@Injectable()
export class SreventsService {
  constructor(
    @InjectRepository(Srevent)
    private sreventsRepository: Repository<Srevent>
  ) {}

  async create(srevent: CreateSreventDto): Promise<Srevent> {
    const newSrevent = this.sreventsRepository.create(srevent);
    await this.sreventsRepository.save(newSrevent);
    return newSrevent;
  }

  async findAll(): Promise<Srevent[]> {
    return this.sreventsRepository.find();
  }

  async findOne(id: number): Promise<Srevent> {
    return this.sreventsRepository.findOneOrFail(id);
  }

  async update(id: number, updateSreventDto: UpdateSreventDto): Promise<Srevent> {
    await this.sreventsRepository.update({ id }, updateSreventDto);
    return this.findOne(id);
  }

  async removeAll(): Promise<{ deleted: boolean; message?: string }> {
    try {
      const oldData = await this.findAll();
      for (const entry of oldData) {
        await this.sreventsRepository.delete(entry.id);
      }
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }

  async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.sreventsRepository.delete(id);
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
