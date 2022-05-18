import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Srland } from "./entities/srland.entity";

import { CreateSrlandDto } from "./dto/create-srland.dto";
import { UpdateSrlandDto } from "./dto/update-srland.dto";

@Injectable()
export class SrlandsService {
  constructor(
    @InjectRepository(Srland)
    private srlandsRepository: Repository<Srland>
  ) {}

  async create(srland: CreateSrlandDto): Promise<Srland> {
    const newSrland = this.srlandsRepository.create(srland);
    await this.srlandsRepository.save(newSrland);
    return newSrland;
  }

  async findAll(): Promise<Srland[]> {
    return this.srlandsRepository.find();
  }

  async findOne(id: number): Promise<Srland> {
    return this.srlandsRepository.findOneOrFail(id);
  }

  async update(id: number, updateSrlandDto: UpdateSrlandDto): Promise<Srland> {
    await this.srlandsRepository.update({ id }, updateSrlandDto);
    return this.findOne(id);
  }

  async removeAll(): Promise<{deleted: boolean; message?: string}> {
    try {
      const oldData = await this.findAll();
      for (const entry of oldData) {
        await this.srlandsRepository.delete(entry.id);
      }
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }

  async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.srlandsRepository.delete(id);
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
