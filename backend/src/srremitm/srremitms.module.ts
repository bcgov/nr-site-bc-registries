import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SrremitmsService } from './srremitms.service';
import { SrremitmsController } from './srremitms.controller';
import { Srremitm } from './entities/srremitm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Srremitm])],
  controllers: [SrremitmsController],
  providers: [SrremitmsService],
  exports: [SrremitmsService, TypeOrmModule.forFeature([Srremitm])],
})
export class SrremitmsModule {}
