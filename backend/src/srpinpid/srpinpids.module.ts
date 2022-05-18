import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SrpinpidsService } from "./srpinpids.service";
import { SrpinpidsController } from "./srpinpids.controller";
import { Srpinpid } from "./entities/srpinpid.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Srpinpid])],
  controllers: [SrpinpidsController],
  providers: [SrpinpidsService],
  exports: [SrpinpidsService, TypeOrmModule.forFeature([Srpinpid])],
})
export class SrpinpidsModule {}
