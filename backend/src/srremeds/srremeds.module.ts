import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SrremedsService } from "./srremeds.service";
import { SrremedsController } from "./srremeds.controller";
import { Srremed } from "./entities/srremed.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Srremed])],
  controllers: [SrremedsController],
  providers: [SrremedsService],
})
export class SrremedsModule {}
