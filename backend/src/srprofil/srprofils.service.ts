import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Srprofil } from './entities/srprofil.entity';

import { CreateSrprofilDto } from './dto/create-srprofil.dto';
import { UpdateSrprofilDto } from './dto/update-srprofil.dto';

@Injectable()
export class SrprofilsService {
  constructor(
    @InjectRepository(Srprofil)
    private srprofilsRepository: Repository<Srprofil>
  ) {}

  async create(srprofil: CreateSrprofilDto): Promise<Srprofil> {
    const newSrprofil = this.srprofilsRepository.create(srprofil);
    await this.srprofilsRepository.save(newSrprofil);
    return newSrprofil;
  }

  async findAll(): Promise<Srprofil[]> {
    return this.srprofilsRepository.find();
  }

  async findOne(id: number): Promise<Srprofil> {
    return this.srprofilsRepository.findOneOrFail(id);
  }

  async update(id: number, updateSrprofilDto: UpdateSrprofilDto): Promise<Srprofil> {
    await this.srprofilsRepository.update({ id }, updateSrprofilDto);
    return this.findOne(id);
  }

  async removeAll(): Promise<{ deleted: boolean; message?: string }> {
    try {
      const oldData = await this.findAll();
      for (const entry of oldData) {
        await this.srprofilsRepository.delete(entry.id);
      }
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }

  async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.srprofilsRepository.delete(id);
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
