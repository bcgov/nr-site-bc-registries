/**
 * Name: siteIdSearch
 * Ticket: N/A
 * Browser: Either
 * Purpose: This script tests the flow for searching by site ID.
 * 1. Login on the bc service website.
 * 2. Navigate to site id search.
 * 3. Search with a known site id.
 * 4. Verify that the search returned results.
 */

import assert from 'assert';
import indexPage from '../../../pageobjects/index.page';
import { login } from '../../../../util/util';
import siteIdSearchPage from '../../../pageobjects/siteIdSearch.page';
import viewSearchResultsPage from '../../../pageobjects/viewSearchResults.page';

const siteId = '2401';

describe('Synopsis Report Test', () => {
  before(async () => {
    await indexPage.open();
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

    it('Check the page title', async () => {
      const expected = 'Site ID Search Results';
      const actual = await viewSearchResultsPage.pageTitle.getText();
      assert.equal(actual, expected);
    });

    it('Check the search criteria', async () => {
      const expected = '2401';
      const actual = await viewSearchResultsPage.searchCriteriaLabel.getText();
      assert.equal(actual, expected);
    });

    it('Verify expected number of rows in the table', async () => {
      const expected = 1;
      const actual = await viewSearchResultsPage.sitesTableAllRows.length;
      assert.equal(actual, expected);
    });

    it('Verify expected number of report type options', async () => {
      const expected = 3;
      const actual = await viewSearchResultsPage.sitesTableFirstRowReportTypeSelectOptions.length;
      assert.equal(actual, expected);
    });

    it('Verify site id', async () => {
      const expected = '2401';
      const actual = await viewSearchResultsPage.sitesTableFirstRowSiteId.getText();
      assert.equal(actual, expected);
    });

    it('Verify updated date not empty', async () => {
      const notExpected = '';
      const actual = await viewSearchResultsPage.sitesTableFirstRowSiteId.getText();
      assert.notEqual(actual, notExpected);
    });

    it('Verify address/city', async () => {
      const expected = '820 GUY STREET, KELOWNA';
      const actual = await viewSearchResultsPage.sitesTableFirstRowAddressCity.getText();
      assert.equal(actual, expected);
    });

    it('Verify status is not pending', async () => {
      const expected = '';
      const actual = await viewSearchResultsPage.sitesTableFirstRowPending.getText();
      assert.equal(actual, expected);
    });

    it('Verify download button is displayed', async () => {
      assert(await viewSearchResultsPage.sitesTableFirstRowDownloadButton.isDisplayed());
    });

    it('Verify email button is displayed', async () => {
      assert(await viewSearchResultsPage.sitesTableFirstRowEmailButton.isDisplayed());
    });
  });
});
