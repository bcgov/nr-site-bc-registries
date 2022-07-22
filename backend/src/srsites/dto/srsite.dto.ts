export class SrsiteDto {
  siteId: string; // a10;
  region: string; // a40;
  status: string; // a40; 'PENDING' or valid status
  commonName: string; // a40;
  address_1: string; // a50;
  address_2: string; // a50;
  address_3: string; // a50;
  address_4: string; // a50;
  city: string; // a30;
  provState: string; // a2;
  postalCode: string; // a10;
  lat: string; // a9;
  latDeg: string; // a3;
  latMin: string; // a3;
  latSec: string; // a3;
  lon: string; // a9;
  lonDeg: string; // a3;
  lonMin: string; // a3;
  lonSec: string; // a3;
  victoriaFileNumber: string; // a40;
  regionalFileNumber: string; // a40;
  classification: string; // a40;
  locationDescription: string; // a255;
  registeredDate: string; // a10;
  modifiedDate: string; // a10;
  detailRemovedDate: string; // a10;
}
