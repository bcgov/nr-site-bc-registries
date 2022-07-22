import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SrremmeasService } from './srremmeas.service';
import { SrremmeasController } from './srremmeas.controller';
import { Srremmea } from './entities/srremmea.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Srremmea])],
  controllers: [SrremmeasController],
  providers: [SrremmeasService],
  exports: [SrremmeasService, TypeOrmModule.forFeature([Srremmea])],
})
export class SrremmeasModule {}
