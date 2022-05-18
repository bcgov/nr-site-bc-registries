import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SrprfcatsService } from "./srprfcats.service";
import { SrprfcatsController } from "./srprfcats.controller";
import { Srprfcat } from "./entities/srprfcat.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Srprfcat])],
  controllers: [SrprfcatsController],
  providers: [SrprfcatsService],
  exports: [SrprfcatsService, TypeOrmModule.forFeature([Srprfcat])]
})
export class SrprfcatsModule {}
