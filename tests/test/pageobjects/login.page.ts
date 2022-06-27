// login.page.ts
import Page from './page';

class LoginPage extends Page {
  get bcServiceCardLink() {
    return $('#zocial-bcsc');
  }
  get virtualTestingLink() {
    return $('#tile_virtual_device_div_id');
  }
  get continueButton() {
    return $('#continue');
  }
  get continueButton2() {
    return $('#btnSubmit');
  }
  get csnInput() {
    return $('#csn');
  }
  get passcodeInput() {
    return $('#passcode');
  }

  async open() {
    await super.open('');
  }
}

export default new LoginPage();
