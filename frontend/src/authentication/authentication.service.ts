import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

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

  constructor(private httpService: HttpService) {
    this.baseURL = process.env.KEYCLOAK_BASE_URL;
    this.realm = process.env.KEYCLOAK_REALM;
  }

  /**
   * Call the OpenId Connect UserInfo endpoint on Keycloak: https://openid.net/specs/openid-connect-core-1_0.html#UserInfo
   *
   * If it succeeds, the token is valid and we get the user infos in the response
   * If it fails, the token is invalid or expired
   */
  async authenticate(accessToken: string): Promise<any> {
    const url = `${this.baseURL}/auth/realms/${this.realm}/protocol/openid-connect/token`;
    console.log('hello');

    try {
      const response = await lastValueFrom(
        this.httpService.get<any>(url, {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        })
      );
      return {
        id: response.data.sub,
        username: response.data.preferred_username,
      };
    } catch (e) {
      throw new AuthenticationError(e.message);
    }
  }
}
