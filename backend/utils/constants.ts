// these headers are used in CronService and are appended to the raw csv file string so that the file can be parsed nicely into a json array
export const CSV_HEADERS = {
  SRASSOCS: 'siteId,associatedSiteId,effectDate,noteString\n',
  SRDATE: 'downloaddate\n',
  SRDOCPAR: 'docId,nameString,roleString\n',
  SREVENTS: 'siteId,eventId,eventType,eventClass,eventDate,ministryContact,noteString,requiredAction\n',
  SREVPART: 'eventId,nameString,roleString\n',
  SRLANDS: 'siteId,landUse,noteString\n',
  SRPARROL: 'participantId,roleString\n',
  SRPINPID: 'siteId,pin,pid,crownLandsFileNumber,legalDescription,dateNoted\n',
  SRPRFANS: 'siteId,questionId,dateCompleted,answer\n',
  SRPRFCAT: 'categoryId,sequenceNumber,effectiveDate,expiryDate,questionType,categoryDescription\n',
  SRPRFQUE: 'questionId,sequenceNumber,categoryId,parentQuestionId,effectiveDate,expiryDate,questionDescription\n',
  SRPRFUSE: 'siteId,dateCompleted,landUseCode,landUseString\n',
  SRPROFIL:
    'siteId,dateCompleted,ownerParticipantId,contactParticipantId,completorParticipantId,dateLocalAuthority,dateRegistrar,dateDecision,comments\n',
  SRSITDOC: 'siteId,docId,titleString,submissionDate,documentDate,noteString\n',
  SRSITES:
    'siteId,region,status,commonName,address_1,address_2,city,provState,postalCode,lat,latDeg,latMin,latSec,lon,lonDeg,lonMin,lonSec,victoriaFileNumber,regionalFileNumber,classification,locationDescription,registeredDate,modifiedDate,detailRemovedDate\n',
  SRSITPAR: 'siteId,participantId,nameString,effectiveDate,endDate,noteString,participantType\n',
};
// srsites with address_3 & address_4
// SRSITES: 'siteId,region,status,commonName,address_1,address_2,address_3,address_4,city,provState,postalCode,lat,latDeg,latMin,latSec,lon,lonDeg,lonMin,lonSec,victoriaFileNumber,regionalFileNumber,classification,locationDescription,registeredDate,modifiedDate,detailRemovedDate\n',

export type MinimalSiteData = {
  siteId: string;
  city: string;
  modifiedDate: string;
  registeredDate: string;
};
