import * as fs from 'fs';
import loginPage from '../test/pageobjects/login.page';
import * as dotenv from 'dotenv';
import * as path from 'path';

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

export function checkExistsWithTimeout(filePath: string, timeout: number) {
  return new Promise<void>(function (resolve, reject) {
    var timer = setTimeout(function () {
      watcher.close();
      reject(new Error('File did not exists and was not created during the timeout.'));
    }, timeout);

    fs.access(filePath, fs.constants.R_OK, function (err) {
      if (!err) {
        clearTimeout(timer);
        watcher.close();
        resolve();
      }
    });

    var dir = path.dirname(filePath);
    var basename = path.basename(filePath);
    var watcher = fs.watch(dir, function (eventType, filename) {
      if (eventType === 'rename' && filename === basename) {
        clearTimeout(timer);
        watcher.close();
        resolve();
      }
    });
  });
}
