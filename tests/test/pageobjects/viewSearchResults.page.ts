// viewSearchResults.page.ts
import Page from './page';

class ViewSearchResultsPage extends Page {
  get pageTitle() {
    return $('#searchType');
  }
  get searchCriteriaTitle() {
    return $('#searchCriteriaTitle');
  }
  get searchCriteriaLabel() {
    return $('#searchCriteria');
  }
  get searchCriteria2Label() {
    return $('#searchCriteria2');
  }
  get searchCriteria3Label() {
    return $('#searchCriteria3');
  }
  get sitesTableAllRows() {
    return $$('#sitesTable tbody tr');
  }
  get sitesTableFirstRow() {
    return $('#sitesTable tbody tr:nth-child(1)');
  }
  get sitesTableFirstRowReportTypeSelect() {
    return $('#sitesTable tbody tr:nth-child(1) td:nth-child(1) select');
  }
  get sitesTableFirstRowReportTypeSelectOptions() {
    return $$('#sitesTable tbody tr:nth-child(1) td:nth-child(1) select option');
  }
  get sitesTableFirstRowSiteId() {
    return $('#sitesTable tbody tr:nth-child(1) td:nth-child(2)');
  }
  get sitesTableFirstRowUpdatedDate() {
    return $('#sitesTable tbody tr:nth-child(1) td:nth-child(3)');
  }
  get sitesTableFirstRowAddressCity() {
    return $('#sitesTable tbody tr:nth-child(1) td:nth-child(4)');
  }
  get sitesTableFirstRowPending() {
    return $('#sitesTable tbody tr:nth-child(1) td:nth-child(5)');
  }
  get sitesTableFirstRowDownloadButton() {
    return $('#sitesTable tbody tr:nth-child(1) td:nth-child(6) button');
  }
  get sitesTableFirstRowEmailButton() {
    return $('#sitesTable tbody tr:nth-child(1) td:nth-child(7) button');
  }
  get backButton() {
    return $('#backButton');
  }

  async open() {
    await super.open('/view-search-results');
  }
}

export default new ViewSearchResultsPage();
