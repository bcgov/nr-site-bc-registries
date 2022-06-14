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
    const token = request.session.data ? request.session.data.access_token : null;

    if (code == null && token == null) {
      throw new UnauthorizedException('No code provided, redirecting.');
    }

    // health check on token
    if (token) {
      if (await this.authenticationService.getHealthCheck(token)) {
        // token is good
        return true;
      } else {
        throw new UnauthorizedException('Invalid token, redirecting');
      }
    } else {
      // get token from code and run a health check
      const tokenObject = await this.authenticationService.getToken(code, redirect);
      if (!tokenObject.error && (await this.authenticationService.getHealthCheck(tokenObject.access_token))) {
        // health check is good, set the session variables
        const tokenDetails = await this.authenticationService.getTokenDetails(tokenObject.access_token);
        request.session.data = {
          ...tokenObject,
          name: tokenDetails.name,
          label: tokenDetails.label,
          accountId: tokenDetails.accountId,
        };
        return true;
      } else {
        // health check is bad (meaning code is bad) so redirect
        throw new UnauthorizedException('Invalid code, redirecting.');
      }
    }
  }
}
