export type postalCodeJSON = {
  POSTAL_CODE: string;
  CITY: string;
  PROVINCE_ABBR: string;
  TIME_ZONE: string;
  LATITUDE: string;
  LONGITUDE: string;
};

export type SessionData = {
  access_token: string;
  refresh_token: string;
  name: string;
  label: string;
  account_id: number;
};

export type TokenObject = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
  error?: any;
};
