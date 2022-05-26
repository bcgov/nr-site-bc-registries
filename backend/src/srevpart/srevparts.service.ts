import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Srevpart } from './entities/srevpart.entity';

import { CreateSrevpartDto } from './dto/create-srevpart.dto';
import { UpdateSrevpartDto } from './dto/update-srevpart.dto';

@Injectable()
export class SrevpartsService {
  constructor(
    @InjectRepository(Srevpart)
    private srevpartsRepository: Repository<Srevpart>
  ) {}

  async create(srevpart: CreateSrevpartDto): Promise<Srevpart> {
    const newSrevpart = this.srevpartsRepository.create(srevpart);
    await this.srevpartsRepository.save(newSrevpart);
    return newSrevpart;
  }

  async findAll(): Promise<Srevpart[]> {
    return this.srevpartsRepository.find();
  }

  async findOne(id: number): Promise<Srevpart> {
    return this.srevpartsRepository.findOneOrFail(id);
  }

  async update(id: number, updateSrevpartDto: UpdateSrevpartDto): Promise<Srevpart> {
    await this.srevpartsRepository.update({ id }, updateSrevpartDto);
    return this.findOne(id);
  }

  async removeAll(): Promise<{ deleted: boolean; message?: string }> {
    try {
      const oldData = await this.findAll();
      for (const entry of oldData) {
        await this.srevpartsRepository.delete(entry.id);
      }
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }

  async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.srevpartsRepository.delete(id);
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
