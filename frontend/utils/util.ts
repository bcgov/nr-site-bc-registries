import * as path from 'path';
import * as fs from 'fs';
const filePath = path.resolve('./utils/postalCodes.json');

export function getPostalCodes() {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
  } catch (err) {
    return null;
  }
}

export function prependZeroesToSiteId(siteId: string) {
  while (siteId.length < 10) {
    siteId = '0' + siteId;
  }
  return siteId;
}

export function checkPostalCode(postalCode) {
  // const regex = new RegExp(/([Vv]\d)([ABCEGHJKLMNPRSTVWXYZabceghjklmnprstvwxyz]\d){2}/i); // spaces and dashes trimmer
  const regex = new RegExp(
    /([Vv]\d)([ABCEGHJKLMNPRSTVWXYZabceghjklmnprstvwxyz] \d)([ABCEGHJKLMNPRSTVWXYZabceghjklmnprstvwxyz]\d)/i
  ); // BC POSTAL CODE - must contain a space
  if (regex.test(postalCode.toString())) {
    return true;
  } else {
    return false;
  }
}

export function newSiteProfileDate(completionDate: string) {
  const testDate = new Date('2021-02-01');
  const date = new Date(completionDate);
  return date >= testDate ? true : false;
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
