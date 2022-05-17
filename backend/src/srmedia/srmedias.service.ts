import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Srmedia } from "./entities/srmedia.entity";

import { CreateSrmediaDto } from "./dto/create-srmedia.dto";
import { UpdateSrmediaDto } from "./dto/update-srmedia.dto";

@Injectable()
export class SrmediasService {
  constructor(
    @InjectRepository(Srmedia)
    private srmediasRepository: Repository<Srmedia>
  ) {}

  async create(srmedia: CreateSrmediaDto): Promise<Srmedia> {
    const newSrmedia = this.srmediasRepository.create(srmedia);
    await this.srmediasRepository.save(newSrmedia);
    return newSrmedia;
  }

  async findAll(): Promise<Srmedia[]> {
    return this.srmediasRepository.find();
  }

  async findOne(id: number): Promise<Srmedia> {
    return this.srmediasRepository.findOneOrFail(id);
  }

  async update(id: number, updateSrmediaDto: UpdateSrmediaDto): Promise<Srmedia> {
    await this.srmediasRepository.update({ id }, updateSrmediaDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.srmediasRepository.delete(id);
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
