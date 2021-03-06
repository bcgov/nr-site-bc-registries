import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Srparrol } from './entities/srparrol.entity';

import { CreateSrparrolDto } from './dto/create-srparrol.dto';
import { UpdateSrparrolDto } from './dto/update-srparrol.dto';

@Injectable()
export class SrparrolsService {
  constructor(
    @InjectRepository(Srparrol)
    private srparrolsRepository: Repository<Srparrol>
  ) {}

  async create(srparrol: CreateSrparrolDto): Promise<Srparrol> {
    const newSrparrol = this.srparrolsRepository.create(srparrol);
    await this.srparrolsRepository.save(newSrparrol);
    return newSrparrol;
  }

  async findAll(): Promise<Srparrol[]> {
    return this.srparrolsRepository.find();
  }

  async findOne(participantId: string): Promise<Srparrol | undefined> {
    return this.srparrolsRepository.findOneOrFail({ participantId });
  }

  async removeAll(): Promise<{ deleted: boolean; message?: string }> {
    try {
      const oldData = await this.findAll();
      for (const entry of oldData) {
        await this.srparrolsRepository.delete(entry.id);
      }
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }

  async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.srparrolsRepository.delete(id);
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
