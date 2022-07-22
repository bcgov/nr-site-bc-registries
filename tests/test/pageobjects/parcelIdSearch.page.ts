// parcelIdSearch.page.ts
import Page from './page';

class ParcelIdSearchPage extends Page {
  get parcelIdInput() {
    return $('#parcelId');
  }
  get parcelIdSearchButton() {
    return $('#searchButton');
  }

  async open() {
    await super.open('/parcel-id');
  }
}

export default new ParcelIdSearchPage();
