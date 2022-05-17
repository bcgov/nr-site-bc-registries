import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SrmeapopsService } from "./srmeapops.service";
import { SrmeapopsController } from "./srmeapops.controller";
import { Srmeapop } from "./entities/srmeapop.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Srmeapop])],
  controllers: [SrmeapopsController],
  providers: [SrmeapopsService],
})
export class SrmeapopsModule {}
