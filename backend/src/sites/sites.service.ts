import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Site } from './entities/site.entity';

import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';

@Injectable()
export class SitesService {
  constructor(
    @InjectRepository(Site)
    private sitesRepository: Repository<Site>
  ) {}

  async create(site: CreateSiteDto): Promise<Site> {
    const newSite = this.sitesRepository.create(site);
    await this.sitesRepository.save(newSite);
    return newSite;
  }

  async findAll(): Promise<Site[]> {
    return this.sitesRepository.find();
  }

  async findOne(id: number): Promise<Site> {
    return this.sitesRepository.findOneOrFail(id);
  }

  async update(id: number, updateSiteDto: UpdateSiteDto): Promise<Site> {
    await this.sitesRepository.update({ id }, updateSiteDto);
    return this.findOne(id);
  }

  async removeAll(): Promise<{ deleted: boolean; message?: string }> {
    try {
      const oldData = await this.findAll();
      for (const entry of oldData) {
        await this.sitesRepository.delete(entry.id);
      }
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }

  async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.sitesRepository.delete(id);
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}