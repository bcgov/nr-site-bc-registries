import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Srremed } from "./entities/srremed.entity";

import { CreateSrremedDto } from "./dto/create-srremed.dto";
import { UpdateSrremedDto } from "./dto/update-srremed.dto";

@Injectable()
export class SrremedsService {
  constructor(
    @InjectRepository(Srremed)
    private srremedsRepository: Repository<Srremed>
  ) {}

  async create(srremed: CreateSrremedDto): Promise<Srremed> {
    const newSrremed = this.srremedsRepository.create(srremed);
    await this.srremedsRepository.save(newSrremed);
    return newSrremed;
  }

  async findAll(): Promise<Srremed[]> {
    return this.srremedsRepository.find();
  }

  async findOne(id: number): Promise<Srremed> {
    return this.srremedsRepository.findOneOrFail(id);
  }

  async update(id: number, updateSrremedDto: UpdateSrremedDto): Promise<Srremed> {
    await this.srremedsRepository.update({ id }, updateSrremedDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.srremedsRepository.delete(id);
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
