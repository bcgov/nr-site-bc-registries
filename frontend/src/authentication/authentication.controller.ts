import { Body, Controller, Post, Session, UseFilters, UseGuards } from '@nestjs/common';
import { SessionData } from 'utils/types';
import { AuthenticationFilter } from './authentication.filter';
import { AuthenticationGuard } from './authentication.guard';

@Controller('authentication')
@UseFilters(AuthenticationFilter)
@UseGuards(AuthenticationGuard)
export class AuthenticationController {
  @Post('setAccount')
  async postAreaSearch(
    @Body() data: { label: string },
    @Session() session: { data?: SessionData }
  ): Promise<{ message: string }> {
    for (const entry of session.data.accounts) {
      if (entry.label == data.label) {
        session.data.activeAccount = entry;
      }
    }
    if (session.data.activeAccount !== undefined) {
      return { message: 'Account Set' };
    } else {
      return { message: 'Something went wrong' };
    }
  }
}
