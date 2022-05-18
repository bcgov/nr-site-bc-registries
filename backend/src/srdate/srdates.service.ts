import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Srdate } from "./entities/srdate.entity";

import { CreateSrdateDto } from "./dto/create-srdate.dto";
import { UpdateSrdateDto } from "./dto/update-srdate.dto";

@Injectable()
export class SrdatesService {
  constructor(
    @InjectRepository(Srdate)
    private srdatesRepository: Repository<Srdate>
  ) {}

  async create(srdate: CreateSrdateDto): Promise<Srdate> {
    const newSrdate = this.srdatesRepository.create(srdate);
    await this.srdatesRepository.save(newSrdate);
    return newSrdate;
  }

  async findAll(): Promise<Srdate[]> {
    return this.srdatesRepository.find();
  }

  async findOne(id: number): Promise<Srdate> {
    return this.srdatesRepository.findOneOrFail(id);
  }

  async update(id: number, updateSrdateDto: UpdateSrdateDto): Promise<Srdate> {
    await this.srdatesRepository.update({ id }, updateSrdateDto);
    return this.findOne(id);
  }

  async removeAll(): Promise<{deleted: boolean; message?: string}> {
    try {
      const oldData = await this.findAll();
      for (const entry of oldData) {
        await this.srdatesRepository.delete(entry.id);
      }
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }

  async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.srdatesRepository.delete(id);
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
