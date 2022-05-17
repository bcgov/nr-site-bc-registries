import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SrlandsService } from "./srlands.service";
import { SrlandsController } from "./srlands.controller";
import { Srland } from "./entities/srland.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Srland])],
  controllers: [SrlandsController],
  providers: [SrlandsService],
})
export class SrlandsModule {}
