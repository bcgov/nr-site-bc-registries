import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Srassoc } from "./entities/srassoc.entity";

import { CreateSrassocDto } from "./dto/create-srassoc.dto";
import { UpdateSrassocDto } from "./dto/update-srassoc.dto";

@Injectable()
export class SrassocsService {
  constructor(
    @InjectRepository(Srassoc)
    private srassocsRepository: Repository<Srassoc>
  ) {}

  async create(srassoc: CreateSrassocDto): Promise<Srassoc> {
    const newSrassoc = this.srassocsRepository.create(srassoc);
    await this.srassocsRepository.save(newSrassoc);
    return newSrassoc;
  }

  async findAll(): Promise<Srassoc[]> {
    return this.srassocsRepository.find();
  }

  async findOne(id: number): Promise<Srassoc> {
    return this.srassocsRepository.findOneOrFail(id);
  }

  async update(id: number, updateSrassocDto: UpdateSrassocDto): Promise<Srassoc> {
    await this.srassocsRepository.update({ id }, updateSrassocDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.srassocsRepository.delete(id);
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
