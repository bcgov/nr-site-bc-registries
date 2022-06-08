import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AuthenticationGuard } from './authentication.guard';
import { AuthenticationService } from './authentication.service';

@Module({
  imports: [HttpModule],
  providers: [AuthenticationGuard, AuthenticationService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
