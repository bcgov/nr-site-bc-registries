import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BCRegistryController } from './bc-registry.controller';
import { BCRegistryService } from './bc-registry.service';

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  controllers: [BCRegistryController],
  providers: [BCRegistryService],
})
export class BCRegistryModule {}
