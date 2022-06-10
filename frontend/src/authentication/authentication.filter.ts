import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { URL } from 'url';

let keycloak_login_fullurl, keycloak_login_baseurl, keycloak_login_params, keycloak_header;
// let redirectUri = encodeURI('http://localhost:3000');

@Catch(HttpException)
export class AuthenticationFilter implements ExceptionFilter {
  constructor() {
    // keycloak_login_params = `response_type=code&client_id=${process.env.KEYCLOAK_CLIENT_ID}&redirect_uri=${redirectUri}`;
    keycloak_login_baseurl = `${process.env.KEYCLOAK_BASE_URL}/auth/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/auth`;
    keycloak_login_fullurl = keycloak_login_baseurl + '?' + keycloak_login_params;
    keycloak_header = `Content-Type:application/x-www-form-urlencoded`;
  }
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const url = new URL('http://' + request.headers.host + response.req.url);
    const urlPath = url.pathname == '/' ? '' : url.pathname;
    const redirect = encodeURI(url.origin + urlPath);
    keycloak_login_params = `?response_type=code&client_id=${process.env.KEYCLOAK_CLIENT_ID}&redirect_uri=${redirect}`;
    keycloak_login_fullurl = keycloak_login_baseurl + keycloak_login_params;
    const status = exception.getStatus();
    console.log(status);
    response.status(status).redirect(keycloak_login_fullurl);
  }
}
