import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Srparrol } from "./entities/srparrol.entity";

import { CreateSrparrolDto } from "./dto/create-srparrol.dto";
import { UpdateSrparrolDto } from "./dto/update-srparrol.dto";

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

  async findOne(id: number): Promise<Srparrol> {
    return this.srparrolsRepository.findOneOrFail(id);
  }

  async update(id: number, updateSrparrolDto: UpdateSrparrolDto): Promise<Srparrol> {
    await this.srparrolsRepository.update({ id }, updateSrparrolDto);
    return this.findOne(id);
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
