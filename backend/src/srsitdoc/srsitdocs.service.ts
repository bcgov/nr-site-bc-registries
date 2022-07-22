import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Srsitdoc } from './entities/srsitdoc.entity';

import { CreateSrsitdocDto } from './dto/create-srsitdoc.dto';
import { UpdateSrsitdocDto } from './dto/update-srsitdoc.dto';

@Injectable()
export class SrsitdocsService {
  constructor(
    @InjectRepository(Srsitdoc)
    private srsitdocsRepository: Repository<Srsitdoc>
  ) {}

  async create(srsitdoc: CreateSrsitdocDto): Promise<Srsitdoc> {
    const newSrsitdoc = this.srsitdocsRepository.create(srsitdoc);
    await this.srsitdocsRepository.save(newSrsitdoc);
    return newSrsitdoc;
  }

  async findAll(): Promise<Srsitdoc[]> {
    return this.srsitdocsRepository.find();
  }

  async findOne(id: number): Promise<Srsitdoc> {
    return this.srsitdocsRepository.findOneOrFail(id);
  }

  async update(id: number, updateSrsitdocDto: UpdateSrsitdocDto): Promise<Srsitdoc> {
    await this.srsitdocsRepository.update({ id }, updateSrsitdocDto);
    return this.findOne(id);
  }

  async removeAll(): Promise<{ deleted: boolean; message?: string }> {
    try {
      const oldData = await this.findAll();
      for (const entry of oldData) {
        await this.srsitdocsRepository.delete(entry.id);
      }
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }

  async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.srsitdocsRepository.delete(id);
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
