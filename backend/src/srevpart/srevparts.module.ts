import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SrevpartsService } from "./srevparts.service";
import { SrevpartsController } from "./srevparts.controller";
import { Srevpart } from "./entities/srevpart.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Srevpart])],
  controllers: [SrevpartsController],
  providers: [SrevpartsService],
  exports: [SrevpartsService, TypeOrmModule.forFeature([Srevpart])],
})
export class SrevpartsModule {}
