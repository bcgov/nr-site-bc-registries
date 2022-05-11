import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BCRegistryController } from './bc-registry.controller';
import { BCRegistryService } from './bc-registry.service';

@Module({
  imports: [HttpModule],
  controllers: [BCRegistryController],
  providers: [BCRegistryService],
})
export class BCRegistryModule {}
