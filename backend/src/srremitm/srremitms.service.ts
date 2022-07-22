import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Srremitm } from './entities/srremitm.entity';

import { CreateSrremitmDto } from './dto/create-srremitm.dto';
import { UpdateSrremitmDto } from './dto/update-srremitm.dto';

@Injectable()
export class SrremitmsService {
  constructor(
    @InjectRepository(Srremitm)
    private srremitmsRepository: Repository<Srremitm>
  ) {}

  async create(srremitm: CreateSrremitmDto): Promise<Srremitm> {
    const newSrremitm = this.srremitmsRepository.create(srremitm);
    await this.srremitmsRepository.save(newSrremitm);
    return newSrremitm;
  }

  async findAll(): Promise<Srremitm[]> {
    return this.srremitmsRepository.find();
  }

  async findOne(id: number): Promise<Srremitm> {
    return this.srremitmsRepository.findOneOrFail(id);
  }

  async update(id: number, updateSrremitmDto: UpdateSrremitmDto): Promise<Srremitm> {
    await this.srremitmsRepository.update({ id }, updateSrremitmDto);
    return this.findOne(id);
  }

  async removeAll(): Promise<{ deleted: boolean; message?: string }> {
    try {
      const oldData = await this.findAll();
      for (const entry of oldData) {
        await this.srremitmsRepository.delete(entry.id);
      }
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }

  async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.srremitmsRepository.delete(id);
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
