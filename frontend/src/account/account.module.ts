import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AccountGuard } from './account.guard';
import { AccountFilter } from './account.filter';

@Module({
  imports: [HttpModule],
  providers: [AccountGuard, AccountFilter],
  exports: [],
})
export class AccountModule {}
