import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SrapproasService } from "./srapproas.service";
import { SrapproasController } from "./srapproas.controller";
import { Srapproa } from "./entities/srapproa.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Srapproa])],
  controllers: [SrapproasController],
  providers: [SrapproasService],
})
export class SrapproasModule {}
