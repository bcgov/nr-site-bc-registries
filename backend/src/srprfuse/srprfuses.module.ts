import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SrprfusesService } from "./srprfuses.service";
import { SrprfusesController } from "./srprfuses.controller";
import { Srprfuse } from "./entities/srprfuse.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Srprfuse])],
  controllers: [SrprfusesController],
  providers: [SrprfusesService],
  exports: [SrprfusesService, TypeOrmModule.forFeature([Srprfuse])]
})
export class SrprfusesModule {}
