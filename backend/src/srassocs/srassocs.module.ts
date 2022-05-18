import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SrassocsService } from "./srassocs.service";
import { SrassocsController } from "./srassocs.controller";
import { Srassoc } from "./entities/srassoc.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Srassoc])],
  controllers: [SrassocsController],
  providers: [SrassocsService],
  exports: [SrassocsService, TypeOrmModule.forFeature([Srassoc])]
})
export class SrassocsModule {}
