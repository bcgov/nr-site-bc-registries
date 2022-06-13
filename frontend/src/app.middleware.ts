import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { URL } from 'url';
import { AuthenticationService } from './authentication/authentication.service';

@Injectable()
export class AppMiddleware implements NestMiddleware {
  constructor(private authenticationService: AuthenticationService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const url = new URL('http://' + req.headers.host + req.originalUrl);
    const urlPath = url.pathname == '/' ? '' : url.pathname;
    const redirect = url.origin + urlPath;

    const code = url.searchParams.get('code') ? url.searchParams.get('code') : null;
    if (!code) {
      res.locals.error = true;
      res.locals.errorMessage = 'No code provided';
    }

    const tokenObject = await this.authenticationService.getToken(code, redirect);
    if (!tokenObject.access_token) {
      res.locals.error = true;
      res.locals.errorMessage = 'Failed to obtain Access Token';
    } else {
      res.locals.token = tokenObject.access_token;
    }

    next();
  }
}
