import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthenticationService } from './authentication.service';
import { Request } from 'express';
import { URL } from 'url';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly authenticationService: AuthenticationService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const url = new URL('http://' + request.headers.host + request.url);
    const urlPath = url.pathname == '/' ? '' : url.pathname;
    const redirect = url.origin + urlPath;
    const code = url.searchParams.get('code');
    const tokenObject = await this.authenticationService.authenticate(code, redirect);
    if (tokenObject.access_token) {
      console.log('guard ok');
      console.log(tokenObject.access_token);
      return true;
    } else {
      throw new UnauthorizedException('Invalid code, redirecting.');
    }
  }
}
