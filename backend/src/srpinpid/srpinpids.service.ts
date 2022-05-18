import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Srpinpid } from "./entities/srpinpid.entity";

import { CreateSrpinpidDto } from "./dto/create-srpinpid.dto";
import { UpdateSrpinpidDto } from "./dto/update-srpinpid.dto";

@Injectable()
export class SrpinpidsService {
  constructor(
    @InjectRepository(Srpinpid)
    private srpinpidsRepository: Repository<Srpinpid>
  ) {}

  async create(srpinpid: CreateSrpinpidDto): Promise<Srpinpid> {
    const newSrpinpid = this.srpinpidsRepository.create(srpinpid);
    await this.srpinpidsRepository.save(newSrpinpid);
    return newSrpinpid;
  }

  async findAll(): Promise<Srpinpid[]> {
    return this.srpinpidsRepository.find();
  }

  async findOne(id: number): Promise<Srpinpid> {
    return this.srpinpidsRepository.findOneOrFail(id);
  }

  async update(id: number, updateSrpinpidDto: UpdateSrpinpidDto): Promise<Srpinpid> {
    await this.srpinpidsRepository.update({ id }, updateSrpinpidDto);
    return this.findOne(id);
  }

  async removeAll(): Promise<{deleted: boolean; message?: string}> {
    try {
      const oldData = await this.findAll();
      for (const entry of oldData) {
        await this.srpinpidsRepository.delete(entry.id);
      }
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }

  async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.srpinpidsRepository.delete(id);
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
