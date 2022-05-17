import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SrsitesService } from "./srsites.service";
import { SrsitesController } from "./srsites.controller";
import { Srsite } from "./entities/srsite.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Srsite])],
  controllers: [SrsitesController],
  providers: [SrsitesService],
})
export class SrsitesModule {}
