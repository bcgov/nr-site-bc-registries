import { Srprofil } from '../src/srprofil/entities/srprofil.entity';

type latlng = { lat: number; lng: number };

export function isInsideArea(checkPoint: latlng, centerPoint: latlng, meters: number) {
  const km = meters / 1000;
  var ky = 40000 / 360;
  var kx = Math.cos((Math.PI * centerPoint.lat) / 180.0) * ky;
  var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
  var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
  return Math.sqrt(dx * dx + dy * dy) <= km;
}

// returns current time in hh:mm:ss format
export function getCurrentTime() {
  let today = new Date();
  today = convertTZ(today, 'America/Vancouver');
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();
  const hStr = hours < 10 ? '0' + hours : hours.toString();
  const mStr = minutes < 10 ? '0' + minutes : minutes.toString();
  const sStr = seconds < 10 ? '0' + seconds : seconds.toString();
  return hStr + ':' + mStr + ':' + sStr;
}

// returns todays date in dd-mm-yy format
export function getTodaysDate() {
  let today = new Date();
  today = convertTZ(today, 'America/Vancouver');
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const dStr = day < 10 ? '0' + day : day.toString();
  const mStr = month < 10 ? '0' + month : month.toString();
  return year + '-' + mStr + '-' + dStr;
}

function convertTZ(date, tzString) {
  return new Date((typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', { timeZone: tzString }));
}

export function delay(milliseconds: number) {
  console.log('Delaying for ' + milliseconds + ' milliseconds');
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function sortJsonArrayAsc(prop) {
  return function (a, b) {
    if (a[prop] > b[prop]) {
      return 1;
    } else if (a[prop] < b[prop]) {
      return -1;
    }
    return 0;
  };
}

export function sortJsonArrayDesc(prop) {
  return function (a, b) {
    if (b[prop] > a[prop]) {
      return 1;
    } else if (b[prop] < a[prop]) {
      return -1;
    }
    return 0;
  };
}

export function filterSrprofil(srprofil: Srprofil[]): Srprofil[] {
  let newestDate = '1900-01-01';
  let currentDate: string;
  let filteredSrprofil: Srprofil[];
  for (const entry of srprofil) {
    currentDate = entry.dateReceived;
    if (new Date(currentDate) > new Date(newestDate)) {
      newestDate = currentDate;
    }
  }
  filteredSrprofil = srprofil.filter(function (x) {
    return x.dateReceived == newestDate;
  });
  return filteredSrprofil;
}

export function logCurrentTimePST(message: string) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // Get the current month (0-11)

  // Determine if it is PDT or PST based on the current month
  const isPDT = currentMonth >= 2 && currentMonth <= 10; // March (2) to November (10)

  // Determine the offset based on whether it is PDT or PST
  const pstOffset = isPDT ? -7 : -8; // PDT offset is -7, PST offset is -8

  const utcTime = currentDate.getTime() + currentDate.getTimezoneOffset() * 60000;
  const pstTime = new Date(utcTime + pstOffset * 3600000);

  const formattedTime = pstTime.toLocaleString('en-US');
  const timeZoneIndicator = isPDT ? 'PDT' : 'PST';
  console.log(`${formattedTime} ${timeZoneIndicator} - ${message}`);
}
