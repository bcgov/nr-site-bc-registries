import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SrprfquesService } from './srprfques.service';
import { SrprfquesController } from './srprfques.controller';
import { Srprfque } from './entities/srprfque.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Srprfque])],
  controllers: [SrprfquesController],
  providers: [SrprfquesService],
  exports: [SrprfquesService, TypeOrmModule.forFeature([Srprfque])],
})
export class SrprfquesModule {}
