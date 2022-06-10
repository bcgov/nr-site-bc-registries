import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import * as base64 from 'base-64';
import axios from 'axios';
import { URLSearchParams } from 'url';

// import { User } from './user.model';

// interface KeycloakUserInfoResponse {
//   sub: string;
//   email_verified: boolean;
//   name: string;
//   preferred_username: string;
//   given_name: string;
//   family_name: string;
//   email: string;
// }

export class AuthenticationError extends Error {}

@Injectable()
export class AuthenticationService {
  private readonly baseURL: string;
  private readonly realm: string;
  private readonly client_id: string;
  private readonly secret: string;
  private readonly redirect_uri: string;
  private readonly grant_type: string;

  constructor(private httpService: HttpService) {
    this.baseURL = process.env.KEYCLOAK_BASE_URL;
    this.realm = process.env.KEYCLOAK_REALM;
    this.client_id = process.env.KEYCLOAK_CLIENT_ID;
    this.secret = process.env.KEYCLOAK_SECRET;
    this.redirect_uri = 'http://localhost:3000/authenticate';
    this.grant_type = 'authorization_code';
  }

  /**
   * Call the OpenId Connect UserInfo endpoint on Keycloak: https://openid.net/specs/openid-connect-core-1_0.html#UserInfo
   *
   * If it succeeds, the token is valid and we get the user infos in the response
   * If it fails, the token is invalid or expired
   */
  async authenticate(code: string): Promise<any> {
    const url = `${this.baseURL}/auth/realms/${this.realm}/protocol/openid-connect/token`;
    const authorization = base64.encode(`${this.client_id}:${this.secret}`);

    const params = new URLSearchParams();
    params.append('code', code);
    params.append('grant_type', this.grant_type);
    params.append('client_id', this.client_id);
    params.append('redirect_uri', this.redirect_uri);

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${authorization}`,
      },
    };
    return axios
      .post(url, params, config)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err.response);
        return { message: 'error' };
      });
    this.httpService.post(url, params, config);
  }
}
