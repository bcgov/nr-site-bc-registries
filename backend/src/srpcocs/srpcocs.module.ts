import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SrpcocsService } from "./srpcocs.service";
import { SrpcocsController } from "./srpcocs.controller";
import { Srpcoc } from "./entities/srpcoc.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Srpcoc])],
  controllers: [SrpcocsController],
  providers: [SrpcocsService],
})
export class SrpcocsModule {}
