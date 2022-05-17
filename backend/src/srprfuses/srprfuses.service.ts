import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Srprfuse } from "./entities/srprfuse.entity";

import { CreateSrprfuseDto } from "./dto/create-srprfuse.dto";
import { UpdateSrprfuseDto } from "./dto/update-srprfuse.dto";

@Injectable()
export class SrprfusesService {
  constructor(
    @InjectRepository(Srprfuse)
    private srprfusesRepository: Repository<Srprfuse>
  ) {}

  async create(srprfuse: CreateSrprfuseDto): Promise<Srprfuse> {
    const newSrprfuse = this.srprfusesRepository.create(srprfuse);
    await this.srprfusesRepository.save(newSrprfuse);
    return newSrprfuse;
  }

  async findAll(): Promise<Srprfuse[]> {
    return this.srprfusesRepository.find();
  }

  async findOne(id: number): Promise<Srprfuse> {
    return this.srprfusesRepository.findOneOrFail(id);
  }

  async update(id: number, updateSrprfuseDto: UpdateSrprfuseDto): Promise<Srprfuse> {
    await this.srprfusesRepository.update({ id }, updateSrprfuseDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.srprfusesRepository.delete(id);
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
