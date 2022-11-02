import { ImATeapotException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as base64 from 'base-64';
import axios from 'axios';
import { URLSearchParams } from 'url';
import jwt_decode from 'jwt-decode';
import { AccountObject, TokenObject } from 'utils/types';

export class AuthenticationError extends Error {}

@Injectable()
export class AuthenticationService {
  private readonly keycloak_base_url: string;
  private readonly realm: string;
  private readonly client_id: string;
  private readonly secret: string;
  private readonly grant_type: string;
  private readonly bc_registry_base_url: string;
  private readonly bc_registry_host: string;
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
    this.bc_registry_host = process.env.BC_REGISTRY_HOST;
  }

  // includes contacts list which the token doesn't contain
  async getUserDetails(token: string) {
    const config = {
      url: `${this.bc_registry_base_url}/auth/api/v1/users/@me`,
      headers: {
        'x-apikey': this.xapikey,
        Authorization: `Bearer ${token}`,
        Accept: '*/*',
        Host: `${this.bc_registry_host}`,
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
      },
    };
    return axios(config)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log('Response:');
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log('Request:');
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log('Error config:');
        console.log(error.config);
        console.log(error);
      });
  }

  async getUserSettings(token: string, guid: string) {
    const config = {
      url: `${this.bc_registry_base_url}/auth/api/v1/users/${guid}/settings`,
      headers: {
        'x-apikey': this.xapikey,
        Authorization: `Bearer ${token}`,
        Accept: '*/*',
        Host: `${this.bc_registry_host}`,
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
      },
    };
    return axios(config)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log('Response:');
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log('Request:');
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log('Error config:');
        console.log(error.config);
        console.log(error);
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
    console.log('-------- get token');
    console.log(url);
    console.log(code);
    console.log(this.grant_type);
    console.log(this.client_id);
    console.log(this.redirect_uri);

    return axios
      .post(url, params, config)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log('Response:');
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log('Request:');
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log('Error config:');
        console.log(error.config);
        console.log(error);
      });
  }

  async getHealthCheck(token: string): Promise<string> {
    let decodedToken: { name: string; exp: number; auth_time: number };
    try {
      decodedToken = jwt_decode(token);
    } catch (err) {
      return 'bad';
    }
    // check that it was decoded
    if (decodedToken.name) {
      const currentTime = new Date().getTime() / 1000;
      const refresh_expiry = decodedToken.auth_time + 28800;
      // check if token has expired
      if (currentTime < decodedToken.exp) {
        return 'good';
      } else if (currentTime > refresh_expiry) {
        return 'bad';
      } else {
        return 'expired';
      }
    }
  }

  async getTokenDetails(
    token: string
  ): Promise<{ activeAccount: AccountObject; accounts: AccountObject[]; name: string; contacts: string[] }> {
    let activeAccount: AccountObject;
    const decodedToken: { sub: string; name: string } = jwt_decode(token);
    // gets name + contacts
    let userDetails: { firstname: string; lastname: string; contacts: [{ email: string }] } = await this.getUserDetails(
      token
    );
    const emailArray: string[] = [];
    // since the user is itself a contact, if there are no contacts then there is no user account for this service
    if (userDetails) {
      if (userDetails.contacts) {
        for (const c of userDetails.contacts) {
          emailArray.push(c.email);
        }
      } else {
        throw new ImATeapotException('Access Denied');
      }
    } else {
      throw new ImATeapotException('Access Denied');
    }
    // gets accounts
    const userSettings = await this.getUserSettings(token, decodedToken.sub);
    const accounts = this.getPremiumUsers(userSettings);
    // if one active+premium account, set that as active account
    if (accounts.length > 1) {
      activeAccount = null;
    } else {
      activeAccount = accounts[0];
    }
    return {
      activeAccount: activeAccount,
      accounts: accounts,
      name: userDetails.firstname + ' ' + userDetails.lastname,
      contacts: emailArray,
    };
  }

  getPremiumUsers(userSettings: AccountObject[]) {
    const accounts: AccountObject[] = [];
    for (const entry of userSettings) {
      // one of the user's accounts
      if (entry.type == 'ACCOUNT') {
        // it's active and premium so add it to account list
        if (entry.accountType == 'PREMIUM' && entry.accountStatus == 'ACTIVE') {
          accounts.push(entry);
        }
      }
    }
    return accounts;
  }

  async refreshToken(refresh_token: string): Promise<TokenObject> {
    const url = `${this.keycloak_base_url}/auth/realms/${this.realm}/protocol/openid-connect/token`;
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refresh_token);
    params.append('client_id', this.client_id);
    params.append('client_secret', this.secret);

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    return axios
      .post(url, params, config)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log('Response:');
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log('Request:');
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log('Error config:');
        console.log(error.config);
        console.log(error);
      });
  }
}
