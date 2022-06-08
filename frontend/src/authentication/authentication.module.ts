import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AuthenticationGuard } from './authentication.guard';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';

@Module({
  imports: [HttpModule],
  providers: [AuthenticationGuard, AuthenticationService],
  controllers: [AuthenticationController],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
