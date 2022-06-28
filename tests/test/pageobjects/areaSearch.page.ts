// addressSearch.page.ts
import Page from './page';

class AreaSearchPage extends Page {
  get postalCodeTab() {
    return $('#pills-postalcode-tab');
  }
  get coordinatesTab() {
    return $('#pills-coordinates-tab');
  }
  get postalCodeInput() {
    return $('#postalCodeInput');
  }
  get latDegInput() {
    return $('#latDegInput');
  }
  get latMinInput() {
    return $('#latMinInput');
  }
  get latSecInput() {
    return $('#latSecInput');
  }
  get lonDegInput() {
    return $('#lonDegInput');
  }
  get lonMinInput() {
    return $('#lonMinInput');
  }
  get lonSecInput() {
    return $('#lonSecInput');
  }
  get smallRadio() {
    return $('#sizeSmall');
  }
  get largeRadio() {
    return $('#sizeLarge');
  }
  get areaSearchButton() {
    return $('#searchButton');
  }

  async open() {
    await super.open('/area-search');
  }
}

export default new AreaSearchPage();
