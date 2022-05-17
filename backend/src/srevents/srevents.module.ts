import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SreventsService } from "./srevents.service";
import { SreventsController } from "./srevents.controller";
import { Srevent } from "./entities/srevent.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Srevent])],
  controllers: [SreventsController],
  providers: [SreventsService],
})
export class SreventsModule {}
