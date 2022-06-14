import { CanActivate, ExecutionContext, Injectable, Session, UnauthorizedException } from '@nestjs/common';

import { AuthenticationService } from './authentication.service';
import { Request, Response } from 'express';
import { URL } from 'url';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly authenticationService: AuthenticationService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request & { session? } = context.switchToHttp().getRequest();
    const url = new URL('http://' + request.headers.host + request.originalUrl);
    const urlPath = url.pathname == '/' ? '' : url.pathname;
    const redirect = url.origin + urlPath;
    const code = url.searchParams.get('code') ? url.searchParams.get('code') : null;

    // health check on token
    if (request.session.token && (await this.authenticationService.getHealthCheck(request.session.token))) {
      // token is good
      return true;
    } else {
      // get token from code and run a health check
      const tokenObject = await this.authenticationService.getToken(code, redirect);
      if (await this.authenticationService.getHealthCheck(tokenObject.access_token)) {
        // health check is good, pass the token to the controller so it can set it in the session
        request.session.token = tokenObject.access_token;
        return true;
      } else {
        // health check is bad (meaning code is bad) so redirect
        throw new UnauthorizedException('Invalid code, redirecting.');
      }
    }
  }
}
