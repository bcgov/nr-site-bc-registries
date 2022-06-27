// crownLandsFileSearch.page.ts
import Page from './page';

class CrownLandsFileSearchPage extends Page {
  get crownLandsFileInput() {
    return $('#crownLandsFile');
  }
  get crownLandsFileSearchButton() {
    return $('#searchButton');
  }

  async open() {
    await super.open('/crown-lands-file');
  }
}

export default new CrownLandsFileSearchPage();
