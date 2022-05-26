import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Srprfcat } from './entities/srprfcat.entity';

import { CreateSrprfcatDto } from './dto/create-srprfcat.dto';
import { UpdateSrprfcatDto } from './dto/update-srprfcat.dto';

@Injectable()
export class SrprfcatsService {
  constructor(
    @InjectRepository(Srprfcat)
    private srprfcatsRepository: Repository<Srprfcat>
  ) {}

  async create(srprfcat: CreateSrprfcatDto): Promise<Srprfcat> {
    const newSrprfcat = this.srprfcatsRepository.create(srprfcat);
    await this.srprfcatsRepository.save(newSrprfcat);
    return newSrprfcat;
  }

  async findAll(): Promise<Srprfcat[]> {
    return this.srprfcatsRepository.find();
  }

  async findOne(id: number): Promise<Srprfcat> {
    return this.srprfcatsRepository.findOneOrFail(id);
  }

  async update(id: number, updateSrprfcatDto: UpdateSrprfcatDto): Promise<Srprfcat> {
    await this.srprfcatsRepository.update({ id }, updateSrprfcatDto);
    return this.findOne(id);
  }

  async removeAll(): Promise<{ deleted: boolean; message?: string }> {
    try {
      const oldData = await this.findAll();
      for (const entry of oldData) {
        await this.srprfcatsRepository.delete(entry.id);
      }
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }

  async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.srprfcatsRepository.delete(id);
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
