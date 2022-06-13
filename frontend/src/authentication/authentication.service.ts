import { Injectable } from '@nestjs/common';
import * as base64 from 'base-64';
import axios from 'axios';
import { URLSearchParams } from 'url';

export class AuthenticationError extends Error {}

@Injectable()
export class AuthenticationService {
  private readonly keycloak_base_url: string;
  private readonly realm: string;
  private readonly client_id: string;
  private readonly secret: string;
  private readonly grant_type: string;
  private readonly bc_registry_base_url: string;
  private readonly xapikey: string;
  private redirect_uri: string;

  constructor() {
    this.keycloak_base_url = process.env.KEYCLOAK_BASE_URL;
    this.realm = process.env.KEYCLOAK_REALM;
    this.client_id = process.env.KEYCLOAK_CLIENT_ID;
    this.secret = process.env.KEYCLOAK_SECRET;
    this.grant_type = 'authorization_code';
    this.xapikey = process.env.KEYCLOAK_XAPIKEY;
    this.bc_registry_base_url = process.env.BC_REGISTRY_BASE_URL;
  }

  async getUserDetails(token: string) {
    const config = {
      url: `${this.bc_registry_base_url}/auth/api/v1/users/@me`,
      headers: {
        'x-apikey': this.xapikey,
        Authorization: `Bearer ${token}`,
        Accept: '*/*',
        Host: 'bcregistry-test.apigee.net',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
      },
    };
    return axios(config)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err.response.data);
        return err.response.data;
      });
  }

  async getUserSettings(token: string, guid: string) {
    const config = {
      url: `${this.bc_registry_base_url}/auth/api/v1/users/${guid}/settings`,
      headers: {
        'x-apikey': this.xapikey,
        Authorization: `Bearer ${token}`,
        Accept: '*/*',
        Host: 'bcregistry-test.apigee.net',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
      },
    };
    return axios(config)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err.response.data);
        return err.response.data;
      });
  }

  /**
   * Call the OpenId Connect UserInfo endpoint on Keycloak: https://openid.net/specs/openid-connect-core-1_0.html#UserInfo
   *
   * If it succeeds, the token is valid and we get the user infos in the response
   * If it fails, the token is invalid or expired
   */
  async getToken(code: string, redirect: string): Promise<any> {
    const url = `${this.keycloak_base_url}/auth/realms/${this.realm}/protocol/openid-connect/token`;
    const authorization = base64.encode(`${this.client_id}:${this.secret}`);
    this.redirect_uri = redirect;

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
        // console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err.response.data);
        return err.response.data;
      });
  }
}
