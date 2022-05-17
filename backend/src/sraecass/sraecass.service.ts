import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Sraecass } from "./entities/sraecass.entity";

import { CreateSraecassDto } from "./dto/create-sraecass.dto";
import { UpdateSraecassDto } from "./dto/update-sraecass.dto";

@Injectable()
export class SraecassService {
  constructor(
    @InjectRepository(Sraecass)
    private sraecassRepository: Repository<Sraecass>
  ) {}

  async create(sraecass: CreateSraecassDto): Promise<Sraecass> {
    const newSraecass = this.sraecassRepository.create(sraecass);
    await this.sraecassRepository.save(newSraecass);
    return newSraecass;
  }

  async findAll(): Promise<Sraecass[]> {
    return this.sraecassRepository.find();
  }

  async findOne(id: number): Promise<Sraecass> {
    return this.sraecassRepository.findOneOrFail(id);
  }

  async update(id: number, updateSraecassDto: UpdateSraecassDto): Promise<Sraecass> {
    await this.sraecassRepository.update({ id }, updateSraecassDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.sraecassRepository.delete(id);
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
