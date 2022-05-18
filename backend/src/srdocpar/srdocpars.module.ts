import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SrdocparsService } from './srdocpars.service';
import { SrdocparsController } from './srdocpars.controller';
import { Srdocpar } from './entities/srdocpar.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Srdocpar])],
    controllers: [SrdocparsController],
    providers: [SrdocparsService],
    exports: [SrdocparsService, TypeOrmModule.forFeature([Srdocpar])],
})
export class SrdocparsModule {}
