import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SrparrolsService } from "./srparrols.service";
import { SrparrolsController } from "./srparrols.controller";
import { Srparrol } from "./entities/srparrol.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Srparrol])],
  controllers: [SrparrolsController],
  providers: [SrparrolsService],
  exports: [SrparrolsService, TypeOrmModule.forFeature([Srparrol])],
})
export class SrparrolsModule {}
