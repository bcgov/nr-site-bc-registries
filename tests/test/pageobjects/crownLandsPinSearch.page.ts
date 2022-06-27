// crownLandsPinSearch.page.ts
import Page from './page';

class CrownLandsPinSearchPage extends Page {
  get crownLandsPinInput() {
    return $('#crownLandsPin');
  }
  get crownLandsPinSearchButton() {
    return $('#searchButton');
  }

  async open() {
    await super.open('/crown-lands-pin');
  }
}

export default new CrownLandsPinSearchPage();
