import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Srprfque } from './entities/srprfque.entity';

import { CreateSrprfqueDto } from './dto/create-srprfque.dto';
import { UpdateSrprfqueDto } from './dto/update-srprfque.dto';

@Injectable()
export class SrprfquesService {
  constructor(
    @InjectRepository(Srprfque)
    private srprfquesRepository: Repository<Srprfque>
  ) {}

  async create(srprfque: CreateSrprfqueDto): Promise<Srprfque> {
    const newSrprfque = this.srprfquesRepository.create(srprfque);
    await this.srprfquesRepository.save(newSrprfque);
    return newSrprfque;
  }

  async findAll(): Promise<Srprfque[]> {
    return this.srprfquesRepository.find();
  }

  async findOne(id: number): Promise<Srprfque> {
    return this.srprfquesRepository.findOneOrFail(id);
  }

  async update(id: number, updateSrprfqueDto: UpdateSrprfqueDto): Promise<Srprfque> {
    await this.srprfquesRepository.update({ id }, updateSrprfqueDto);
    return this.findOne(id);
  }

  async removeAll(): Promise<{ deleted: boolean; message?: string }> {
    try {
      const oldData = await this.findAll();
      for (const entry of oldData) {
        await this.srprfquesRepository.delete(entry.id);
      }
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }

  async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.srprfquesRepository.delete(id);
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
