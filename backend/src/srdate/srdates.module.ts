import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SrdatesService } from "./srdates.service";
import { SrdatesController } from "./srdates.controller";
import { Srdate } from "./entities/srdate.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Srdate])],
  controllers: [SrdatesController],
  providers: [SrdatesService],
})
export class SrdatesModule {}
