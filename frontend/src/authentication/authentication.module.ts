import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AuthenticationGuard } from './authentication.guard';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationFilter } from './authentication.filter';

@Module({
  imports: [HttpModule],
  providers: [AuthenticationGuard, AuthenticationFilter, AuthenticationService],
  exports: [AuthenticationService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
