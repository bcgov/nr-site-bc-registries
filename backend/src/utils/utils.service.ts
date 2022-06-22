import { Injectable } from '@nestjs/common';

type latlng = { lat: number; lng: number };

const CSV_HEADERS = {
  SRASSOCS: 'siteId,associatedSiteId,effectDate,noteString\n',
  SRDATE: 'downloaddate\n',
  SRDOCPAR: 'docId,nameString,roleString\n',
  SREVENTS: 'siteId,eventId,eventType,eventClass,eventDate,approvedDate,ministryContact,noteString,requiredAction\n',
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

@Injectable()
export class UtilsService {
  getCsvHeaders(): any {
    return CSV_HEADERS;
  }

  isInsideArea(checkPoint: latlng, centerPoint: latlng, meters: number) {
    const km = meters / 1000;
    var ky = 40000 / 360;
    var kx = Math.cos((Math.PI * centerPoint.lat) / 180.0) * ky;
    var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
    var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= km;
  }

  // returns current time in hh:mm:ss format
  getCurrentTime() {
    const today = new Date();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();
    const hStr = hours < 10 ? '0' + hours : hours.toString();
    const mStr = minutes < 10 ? '0' + minutes : minutes.toString();
    const sStr = seconds < 10 ? '0' + seconds : seconds.toString();
    return hStr + ':' + mStr + ':' + sStr;
  }

  // returns todays date in dd-mm-yy format
  getTodaysDate() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();
    const dStr = day < 10 ? '0' + day : day.toString();
    const mStr = month < 10 ? '0' + month : month.toString();
    const yStr = year.toString().slice(2);
    return dStr + '-' + mStr + '-' + yStr;
  }
}
