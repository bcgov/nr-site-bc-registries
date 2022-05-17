import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Srpcoc } from "./entities/srpcoc.entity";

import { CreateSrpcocDto } from "./dto/create-srpcoc.dto";
import { UpdateSrpcocDto } from "./dto/update-srpcoc.dto";

@Injectable()
export class SrpcocsService {
  constructor(
    @InjectRepository(Srpcoc)
    private srpcocsRepository: Repository<Srpcoc>
  ) {}

  async create(srpcoc: CreateSrpcocDto): Promise<Srpcoc> {
    const newSrpcoc = this.srpcocsRepository.create(srpcoc);
    await this.srpcocsRepository.save(newSrpcoc);
    return newSrpcoc;
  }

  async findAll(): Promise<Srpcoc[]> {
    return this.srpcocsRepository.find();
  }

  async findOne(id: number): Promise<Srpcoc> {
    return this.srpcocsRepository.findOneOrFail(id);
  }

  async update(id: number, updateSrpcocDto: UpdateSrpcocDto): Promise<Srpcoc> {
    await this.srpcocsRepository.update({ id }, updateSrpcocDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.srpcocsRepository.delete(id);
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
