// siteIdSearch.page.ts
import Page from './page';

class SiteIdSearch extends Page {
  get siteIdInput() {
    return $('#siteId');
  }
  get siteIdSelectionListButton() {
    return $('#siteIdSelectionList');
  }

  async open() {
    await super.open('/site-id-search');
  }
}

export default new SiteIdSearch();
