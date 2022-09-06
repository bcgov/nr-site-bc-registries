import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateActionDto } from './dto/create-action.dto';
import { UpdateActionDto } from './dto/update-action.dto';
import { Action } from './entities/action.entity';

@Injectable()
export class ActionsService {
    constructor(
        @InjectRepository(Action)
        private actionsRepository: Repository<Action>
      ) {}
    
      async create(action: CreateActionDto): Promise<Action> {
        const newAction = await this.actionsRepository.create(action);
        await this.actionsRepository.save(newAction);
        return newAction;
      }
    
      async findAll(): Promise<Action[]> {
        return this.actionsRepository.find();
      }
    
      async findOne(id: number): Promise<Action> {
        return this.actionsRepository.findOneOrFail(id);
      }

      async findFirst(): Promise<Action> {
        const action = await this.actionsRepository.find();
        return action[0];
      }
    
      async update(updateActionDto: UpdateActionDto): Promise<Action> {
        const actions = await this.actionsRepository.find();
        await this.actionsRepository.update(actions[0].id, updateActionDto);
        return this.findOne(actions[0].id);
      }
    
      async removeAll(): Promise<{ deleted: boolean; message?: string }> {
        try {
          const oldData = await this.findAll();
          for (const entry of oldData) {
            await this.actionsRepository.delete(entry.id);
          }
          return { deleted: true };
        } catch (err) {
          return { deleted: false, message: err.message };
        }
      }
    
      async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
        try {
          await this.actionsRepository.delete(id);
          return { deleted: true };
        } catch (err) {
          return { deleted: false, message: err.message };
        }
      }
}
