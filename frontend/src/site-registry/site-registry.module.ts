import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SiteRegistryController } from './site-registry.controller';
import { SiteRegistryService } from './site-registry.service';

@Module({
  imports: [HttpModule],
  controllers: [SiteRegistryController],
  providers: [SiteRegistryService],
})
export class SiteRegistryModule {}
