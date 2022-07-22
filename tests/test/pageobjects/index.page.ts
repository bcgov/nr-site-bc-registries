// index.page.ts
import Page from './page';

class IndexPage extends Page {
  get parcelIdSearchLink() {
    return $('#parcel-id');
  }
  get crownLandsPinSearchLink() {
    return $('#crown-lands-pin');
  }
  get crownLandsFileSearchLink() {
    return $('#crown-lands-file');
  }
  get siteIdSearchLink() {
    return $('#site-id-search');
  }
  get addressSearchLink() {
    return $('#address-search');
  }
  get areaSearchLink() {
    return $('#area-search');
  }

  async open() {
    await super.open('');
  }
}

export default new IndexPage();
