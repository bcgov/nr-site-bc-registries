import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SrmeasursService } from "./srmeasurs.service";
import { SrmeasursController } from "./srmeasurs.controller";
import { Srmeasur } from "./entities/srmeasur.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Srmeasur])],
  controllers: [SrmeasursController],
  providers: [SrmeasursService],
})
export class SrmeasursModule {}
