import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Srsite } from './entities/srsite.entity';

import { CreateSrsiteDto } from './dto/create-srsite.dto';
import { UpdateSrsiteDto } from './dto/update-srsite.dto';
import { Srpinpid } from '../srpinpid/entities/srpinpid.entity';

import { isInsideArea } from '../../utils/util';

@Injectable()
export class SrsitesService {
  constructor(
    @InjectRepository(Srsite)
    private srsitesRepository: Repository<Srsite>,
    @InjectRepository(Srpinpid)
    private srpinpidsRepository: Repository<Srpinpid>
  ) {}

  async create(srsite: CreateSrsiteDto): Promise<Srsite> {
    const newSrsite = this.srsitesRepository.create(srsite);
    await this.srsitesRepository.save(newSrsite);
    return newSrsite;
  }

  async findAll(): Promise<Srsite[]> {
    return this.srsitesRepository.find();
  }

  async findOne(id: number): Promise<Srsite> {
    return this.srsitesRepository.findOneOrFail(id);
  }

  async searchPid(pid: string): Promise<Srsite[]> {
    const srpinpid = await this.srpinpidsRepository.findOne({ pid: pid });
    const site = await this.srsitesRepository.findOne({ siteId: srpinpid.siteId });
    return [site];
  }

  async searchCrownPin(pin: string): Promise<Srsite[]> {
    const srpinpid = await this.srpinpidsRepository.findOne({ pin: pin });
    const site = await this.srsitesRepository.findOne({ siteId: srpinpid.siteId });
    return [site];
  }

  async searchCrownFile(crownLandsFileNumber: string): Promise<Srsite[]> {
    const srpinpid = await this.srpinpidsRepository.findOne({ crownLandsFileNumber: crownLandsFileNumber });
    const site = await this.srsitesRepository.findOne({ siteId: srpinpid.siteId });
    return [site];
  }

  async searchSiteId(siteId: string): Promise<Srsite[]> {
    const site = await this.srsitesRepository.findOne({ siteId: siteId });
    return [site];
  }

  async searchAddress(address: string): Promise<Srsite[]> {
    const site = await this.srsitesRepository
      .createQueryBuilder()
      .where('LOWER(address_1) = LOWER(:address)', { address })
      .getOne();
    return [site];
  }

  async searchArea(lat: string, lng: string, size: string): Promise<Srsite[]> {
    const radius = size == 'Small' ? 564.19 : size == 'Large' ? 5641.89 : 0;
    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);
    const userLatlng = { lat: userLat, lng: userLng };
    const sites = [];
    const allSites = await this.findAll();
    for (let site of allSites) {
      const lat = parseFloat([site.lat.slice(0, 3), '.', site.lat.slice(3)].join(''));
      const lng = parseFloat([site.lon.slice(0, 3), '.', site.lon.slice(3)].join(''));
      const latlng = { lat: lat, lng: lng };
      if (isInsideArea(userLatlng, latlng, radius)) sites.push(site);
    }
    return sites;
  }

  async update(id: number, updateSrsiteDto: UpdateSrsiteDto): Promise<Srsite> {
    await this.srsitesRepository.update({ id }, updateSrsiteDto);
    return this.findOne(id);
  }

  async removeAll(): Promise<{ deleted: boolean; message?: string }> {
    try {
      const oldData = await this.findAll();
      for (const entry of oldData) {
        await this.srsitesRepository.delete(entry.id);
      }
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }

  async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.srsitesRepository.delete(id);
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
