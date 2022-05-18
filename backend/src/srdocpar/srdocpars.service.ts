import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Srdocpar } from './entities/srdocpar.entity';

import { CreateSrdocparDto } from './dto/create-srdocpar.dto';
import { UpdateSrdocparDto } from './dto/update-srdocpar.dto';

@Injectable()
export class SrdocparsService {
    constructor(
        @InjectRepository(Srdocpar)
        private srdocparsRepository: Repository<Srdocpar>
    ) {}

    async create(srdocpar: CreateSrdocparDto): Promise<Srdocpar> {
        const newSrdocpar = this.srdocparsRepository.create(srdocpar);
        await this.srdocparsRepository.save(newSrdocpar);
        return newSrdocpar;
    }

    async findAll(): Promise<Srdocpar[]> {
        return this.srdocparsRepository.find();
    }

    async findOne(id: number): Promise<Srdocpar> {
        return this.srdocparsRepository.findOneOrFail(id);
    }

    async update(
        id: number,
        updateSrdocparDto: UpdateSrdocparDto
    ): Promise<Srdocpar> {
        await this.srdocparsRepository.update({ id }, updateSrdocparDto);
        return this.findOne(id);
    }

    async removeAll(): Promise<{ deleted: boolean; message?: string }> {
        try {
            const oldData = await this.findAll();
            for (const entry of oldData) {
                await this.srdocparsRepository.delete(entry.id);
            }
            return { deleted: true };
        } catch (err) {
            return { deleted: false, message: err.message };
        }
    }

    async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
        try {
            await this.srdocparsRepository.delete(id);
            return { deleted: true };
        } catch (err) {
            return { deleted: false, message: err.message };
        }
    }
}
