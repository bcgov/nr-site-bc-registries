import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Srprfan } from './entities/srprfan.entity';

import { CreateSrprfanDto } from './dto/create-srprfan.dto';
import { UpdateSrprfanDto } from './dto/update-srprfan.dto';

@Injectable()
export class SrprfansService {
  constructor(
    @InjectRepository(Srprfan)
    private srprfansRepository: Repository<Srprfan>
  ) {}

  async create(srprfan: CreateSrprfanDto): Promise<Srprfan> {
    const newSrprfan = this.srprfansRepository.create(srprfan);
    await this.srprfansRepository.save(newSrprfan);
    return newSrprfan;
  }

  async findAll(): Promise<Srprfan[]> {
    return this.srprfansRepository.find();
  }

  async findOne(id: number): Promise<Srprfan> {
    return this.srprfansRepository.findOneOrFail(id);
  }

  async update(id: number, updateSrprfanDto: UpdateSrprfanDto): Promise<Srprfan> {
    await this.srprfansRepository.update({ id }, updateSrprfanDto);
    return this.findOne(id);
  }

  async removeAll(): Promise<{ deleted: boolean; message?: string }> {
    try {
      const oldData = await this.findAll();
      for (const entry of oldData) {
        await this.srprfansRepository.delete(entry.id);
      }
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }

  async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.srprfansRepository.delete(id);
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
