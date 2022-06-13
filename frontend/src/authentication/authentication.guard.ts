import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthenticationService } from './authentication.service';
import { Response } from 'express';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly authenticationService: AuthenticationService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const response: Response = context.switchToHttp().getResponse();
    if (response.locals.error) {
      throw new UnauthorizedException('Invalid code, redirecting.');
    } else if (response.locals.token) {
      return true; // should do a token health check here instead
    } else {
      return false; // should never reach here
    }
  }
}
