import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ImATeapotException } from '@nestjs/common';

import { AuthenticationService } from './authentication.service';
import { Request } from 'express';
import { URL } from 'url';
import { AccountObject, TokenObject } from 'utils/types';
import jwt_decode from 'jwt-decode';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly authenticationService: AuthenticationService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request & { session? } = context.switchToHttp().getRequest();
    const protocol = process.env.site_environment == 'DEVELOPMENT' ? 'http://' : 'https://';
    const url = new URL(protocol + request.headers.host + request.originalUrl);
    const urlPath = url.pathname == '/' ? '' : url.pathname;
    const redirect = url.origin + urlPath;

    // const keycloak_login_baseurl = `${process.env.KEYCLOAK_BASE_URL}/auth/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/auth`;
    // const keycloak_login_params = `?response_type=code&client_id=${process.env.KEYCLOAK_CLIENT_ID}&redirect_uri=${redirect}`;
    // const keycloak_login_fullurl = keycloak_login_baseurl + keycloak_login_params;
    // console.log(keycloak_login_fullurl);

    const code = url.searchParams.get('code') ? url.searchParams.get('code') : null;
    console.log(code);
    const token = request.session.data ? request.session.data.access_token : null;
    const activeAccount = request.session.data
      ? request.session.data.activeAccount
        ? request.session.data.activeAccount
        : null
      : null;
    const accounts = request.session.data
      ? request.session.data.accounts
        ? request.session.data.accounts
        : null
      : null;

    let tokenStatus: string;
    let tokenObject: TokenObject;
    let tokenDetails: { activeAccount: AccountObject; accounts: AccountObject[]; name: string; contacts: string[] };

    const decodedToken: { sub: string } = jwt_decode(token);
    if (activeAccount && activeAccount.guid != decodedToken.sub) {
      console.log('WEIRD ACTIVE ACCOUNT');
      tokenStatus = 'new';
    } else if (!activeAccount) {
      console.log('NO ACTIVE ACCOUNT');
      const userSettings = await this.authenticationService.getUserSettings(token, decodedToken.sub);
      const actualAccounts = this.authenticationService.getPremiumUsers(userSettings);
      let correctAccount = false;
      for (const a of actualAccounts) {
        for (const b of accounts) {
          if (a.id == b.id) {
            correctAccount = true;
          }
        }
      }
      if (!correctAccount) {
        console.log('account is NOT CORRECT');
        tokenStatus = 'new';
      }
    }

    // no session and no code
    if (code == null && token == null) {
      throw new UnauthorizedException('No code provided, redirecting.');
    }
    // else {
    // console.log('grabbing tokenobject');
    // tokenObject = await this.authenticationService.getToken(code, redirect);
    // token = tokenObject.access_token;
    // console.log(tokenObject);
    // }

    // console.log(request.session.data);

    // this will return either 'good', 'bad', 'new', or 'expired'
    if (tokenStatus != 'new') {
      tokenStatus = await this.authenticationService.getHealthCheck(token);
    }
    console.log(tokenStatus);

    // user has changed
    if (tokenStatus == 'new') {
      try {
        tokenDetails = await this.authenticationService.getTokenDetails(token);
      } catch (err) {
        throw new ImATeapotException('Access denied.');
      }
      request.session.data = {
        ...tokenObject,
        activeAccount: tokenDetails.activeAccount,
        accounts: tokenDetails.accounts,
        name: tokenDetails.name,
        contacts: tokenDetails.contacts,
        savedReports: [],
      };
      return true;
    }

    // token is either good or expired
    if (token && tokenStatus !== 'bad') {
      // token is good
      if (tokenStatus == 'good') {
        return true;
      }
      // token is expired
      else {
        // get a new one from refresh_token and then check it
        tokenObject = await this.authenticationService.refreshToken(request.session.data.refresh_token);
        tokenStatus = await this.authenticationService.getHealthCheck(tokenObject.access_token);
        if (tokenStatus == 'good') {
          // health check is good, set the session variables
          try {
            tokenDetails = await this.authenticationService.getTokenDetails(tokenObject.access_token);
          } catch (err) {
            throw new ImATeapotException('Access denied.');
          }
          request.session.data = {
            ...tokenObject,
            activeAccount: tokenDetails.activeAccount,
            accounts: tokenDetails.accounts,
            name: tokenDetails.name,
            contacts: tokenDetails.contacts,
            savedReports: [],
          };
          return true;
        } else {
          request.session = null; // this doesn't delete the session in the database but it forces a new session to be created
          throw new UnauthorizedException('Invalid token, redirecting');
        }
      }
    }
    // token is either bad or non-existent, code is present
    else {
      // get token from code and run a health check
      tokenObject = await this.authenticationService.getToken(code, redirect);
      if (tokenObject) {
        tokenStatus = await this.authenticationService.getHealthCheck(tokenObject.access_token);
        if (tokenStatus == 'good') {
          // health check is good, set the session variables
          try {
            tokenDetails = await this.authenticationService.getTokenDetails(tokenObject.access_token);
          } catch (err) {
            throw new ImATeapotException('Access denied.');
          }
          request.session.data = {
            ...tokenObject,
            activeAccount: tokenDetails.activeAccount,
            accounts: tokenDetails.accounts,
            name: tokenDetails.name,
            contacts: tokenDetails.contacts,
            savedReports: [],
          };
          return true;
        } else {
          // health check is bad (meaning code is bad) so redirect
          request.session = null;
          throw new UnauthorizedException('Invalid code, redirecting.');
        }
      } else {
        // Bad code so redirect
        request.session = null;
        throw new UnauthorizedException('Invalid code, redirecting.');
      }
    }
  }
}
