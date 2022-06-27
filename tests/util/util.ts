import * as fs from 'fs';
import loginPage from '../test/pageobjects/login.page';
import * as dotenv from 'dotenv';

dotenv.config();

// checks that a date follows the yyyy-mm-dd format
export function isValidDate(dateString: string) {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  return dateString.match(regEx) != null;
}

// checks whether an input has disabledAtEndorsement in its class
export const daeCheck = async (element: any) => {
  await expect(element).toHaveAttrContaining('class', 'disabledAtEndorsement');
};

// bc registries test environment login
export async function login() {
  let username = process.env.test_user != undefined ? process.env.test_user : '';
  let password = process.env.test_password != undefined ? process.env.test_password : '';
  await loginPage.bcServiceCardLink.waitForDisplayed();
  await loginPage.bcServiceCardLink.click();
  await loginPage.virtualTestingLink.waitForDisplayed();
  await loginPage.virtualTestingLink.click();
  await loginPage.csnInput.waitForDisplayed();
  await loginPage.csnInput.setValue(username);
  await loginPage.continueButton.waitForDisplayed();
  await loginPage.continueButton.click();
  await loginPage.passcodeInput.waitForDisplayed();
  await loginPage.continueButton2.waitForDisplayed();
  await loginPage.passcodeInput.setValue(password);
  await loginPage.continueButton2.click();
}

// used by waitForFileDownload to periodically check for a file's existence
const checkPermissions = (file: string) => {
  fs.access(file, fs.constants.F_OK, (err) => {
    return false;
  });
  return true;
};

// checks once per second for the existence of a file
// the pause after the file is found is to let the file finish downloading before continuing
export async function waitForFileDownload(file: string) {
  let exists: boolean = false;
  let counter: number = 0;
  while (!exists && counter < 30) {
    // this is synchronous and probably never gets to the else statement
    if (checkPermissions(file)) {
      console.log('File found');
      exists = true;
      await browser.pause(3000);
    } else {
      console.log('Waiting for file download: ' + counter + 's');
      counter++;
      await browser.pause(1000);
    }
  }
}
