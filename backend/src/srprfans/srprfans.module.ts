import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SrprfansService } from "./srprfans.service";
import { SrprfansController } from "./srprfans.controller";
import { Srprfan } from "./entities/srprfan.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Srprfan])],
  controllers: [SrprfansController],
  providers: [SrprfansService],
})
export class SrprfansModule {}
