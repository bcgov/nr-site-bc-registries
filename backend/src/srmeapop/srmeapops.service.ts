import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Srmeapop } from "./entities/srmeapop.entity";

import { CreateSrmeapopDto } from "./dto/create-srmeapop.dto";
import { UpdateSrmeapopDto } from "./dto/update-srmeapop.dto";

@Injectable()
export class SrmeapopsService {
  constructor(
    @InjectRepository(Srmeapop)
    private srmeapopsRepository: Repository<Srmeapop>
  ) {}

  async create(srmeapop: CreateSrmeapopDto): Promise<Srmeapop> {
    const newSrmeapop = this.srmeapopsRepository.create(srmeapop);
    await this.srmeapopsRepository.save(newSrmeapop);
    return newSrmeapop;
  }

  async findAll(): Promise<Srmeapop[]> {
    return this.srmeapopsRepository.find();
  }

  async findOne(id: number): Promise<Srmeapop> {
    return this.srmeapopsRepository.findOneOrFail(id);
  }

  async update(id: number, updateSrmeapopDto: UpdateSrmeapopDto): Promise<Srmeapop> {
    await this.srmeapopsRepository.update({ id }, updateSrmeapopDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.srmeapopsRepository.delete(id);
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
