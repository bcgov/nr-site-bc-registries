import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Srmeasur } from "./entities/srmeasur.entity";

import { CreateSrmeasurDto } from "./dto/create-srmeasur.dto";
import { UpdateSrmeasurDto } from "./dto/update-srmeasur.dto";

@Injectable()
export class SrmeasursService {
  constructor(
    @InjectRepository(Srmeasur)
    private srmeasursRepository: Repository<Srmeasur>
  ) {}

  async create(srmeasur: CreateSrmeasurDto): Promise<Srmeasur> {
    const newSrmeasur = this.srmeasursRepository.create(srmeasur);
    await this.srmeasursRepository.save(newSrmeasur);
    return newSrmeasur;
  }

  async findAll(): Promise<Srmeasur[]> {
    return this.srmeasursRepository.find();
  }

  async findOne(id: number): Promise<Srmeasur> {
    return this.srmeasursRepository.findOneOrFail(id);
  }

  async update(id: number, updateSrmeasurDto: UpdateSrmeasurDto): Promise<Srmeasur> {
    await this.srmeasursRepository.update({ id }, updateSrmeasurDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.srmeasursRepository.delete(id);
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
