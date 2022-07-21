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
  accounts: AccountObject[];
  activeAccount: AccountObject;
  name: string;
  contacts: string[];
  savedReports: savedReport[];
};

export type AccountObject = {
  accountStatus: string;
  accountType: string;
  id: number;
  label: string;
  type: string;
};

type savedReport = [string, string];

export type TokenObject = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
  error?: any;
};

export type SearchResultsObject = {
  siteId: string;
  city: string;
  modifiedDate: string;
  registeredDate: string;
};

export type SearchResultsJson = {
  email: string;
  searchInfo: {
    searchType: string;
    searchCriteria1: string;
    searchCriteria2: string;
    searchCriteria3: string;
  };
  searchData: [SearchResultsJsonObject];
};

export type SearchResultsJsonObject = {
  siteId: string;
  city: string;
  updatedDate: string;
};
