// addressSearch.page.ts
import Page from './page';

class AddressSearchPage extends Page {
  get addressInput() {
    return $('#address');
  }
  get cityInput() {
    return $('#city');
  }
  get addressSearchButton() {
    return $('#searchButton');
  }

  async open() {
    await super.open('/address-search');
  }
}

export default new AddressSearchPage();
