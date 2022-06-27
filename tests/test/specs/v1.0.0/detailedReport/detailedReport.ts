/**
 * Name: detailedReport
 * Ticket: N/A
 * Browser: Chrome
 * Purpose: This script tests that a known site generates certain values in its detailed report.
 * 1. Login on the bc service website.
 * 2. Navigate to site id search.
 * 3. Search with a known site id.
 * 4. Download the detailed report.
 * 5. Verify some values in the generated pdf.
 */

import assert from 'assert';
import * as fs from 'fs';
import pdfParse from 'pdf-parse';
import indexPage from '../../../pageobjects/index.page';
import { checkExistsWithTimeout, login } from '../../../../util/util';
import siteIdSearchPage from '../../../pageobjects/siteIdSearch.page';
import viewSearchResultsPage from '../../../pageobjects/viewSearchResults.page';

const siteId: string = '2401';
const pdfFile: string = downloadDir + `\\detailed-report_siteid-${siteId}.pdf`;
let pdfText: string;

const readPdf = async (uri: any) => {
  const buffer = fs.readFileSync(uri);
  try {
    const data = await pdfParse(buffer);
    pdfText = data.text;
  } catch (err: any) {
    throw new Error(err);
  }
};

describe('Detailed Report Test', () => {
  before(async () => {
    console.log('dirname: ' + __dirname);
    console.log('downloadDir: ' + downloadDir);
    await indexPage.open();
  });

  after(async () => {
    try {
      fs.unlinkSync(pdfFile);
      console.log('File removed: ', pdfFile);
    } catch (err) {
      console.error(err);
    }
  });

  describe('Login and check the index page', () => {
    it('Login', async () => {
      await login();
    });

    it('Check index title', async () => {
      await indexPage.siteIdSearchLink.waitForDisplayed();
      const expectedTitle = 'DEVELOPMENT - BC Site Registry';
      const actualTitle = await browser.getTitle();
      assert.equal(expectedTitle, actualTitle);
    });

    it('Click site id search link', async () => {
      await indexPage.siteIdSearchLink.click();
    });

    it('Check site id search title', async () => {
      await siteIdSearchPage.siteIdInput.waitForDisplayed();
      const expectedTitle = 'DEVELOPMENT - Site ID Search';
      const actualTitle = await browser.getTitle();
      assert.equal(expectedTitle, actualTitle);
    });

    it('Input a site id and attempt to search', async () => {
      await siteIdSearchPage.siteIdInput.setValue(siteId);
      await siteIdSearchPage.siteIdSelectionListButton.click();
    });

    it('Verify email button is displayed', async () => {
      await viewSearchResultsPage.sitesTableFirstRowReportTypeSelect.waitForDisplayed();
      await viewSearchResultsPage.sitesTableFirstRowReportTypeSelect.selectByIndex(2);
      await viewSearchResultsPage.sitesTableFirstRowDownloadButton.waitForDisplayed();
      await viewSearchResultsPage.sitesTableFirstRowDownloadButton.click();
    });

    it('Wait for the report to download', async () => {
      await checkExistsWithTimeout(pdfFile, 40000);
    }).timeout(40000);

    it('Read the pdf text to a variable', async () => {
      await readPdf(pdfFile);
    });

    // pdf text gets parsed into a single string, search that string for expected unique values
    it('Check for expected parcel description', async () => {
      assert(pdfText.includes('LOT A DISTRICT LOT 5104 OSOYOOS DIVISION YALE DISTRICT PLAN 27467'));
    });

    it('Check for expected latitude', async () => {
      assert(pdfText.includes('49d 53m 57.3s'));
    });

    it('Check for expected longitude', async () => {
      assert(pdfText.includes('119d 30m 01.6s'));
    });

    it('Check for a known string in notations section', async () => {
      assert(pdfText.includes('CONTAMINATED SOIL WAS EXCAVATED AND TREATED.'));
    });

    it('Check for a known string in site participants section', async () => {
      assert(pdfText.includes('(BURNABY, B.C.)'));
    });

    it('Check for End of Detailed Report', async () => {
      assert(pdfText.includes('End of Detailed Report'));
    });
  });
});
