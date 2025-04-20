import { expect, Locator, Page } from "@playwright/test";
const RegistrationAccountData = require("../data/registrationAccountData.json");

export default class RegistrationAccountPage {
  private readonly hoverMyAccountDropdownMenuSelector: Locator;
  private readonly clickRegisterLinkInputSelector: Locator;
  private readonly firstNameInputSelector: Locator;
  private readonly lastnameInputSelector: Locator;
  private readonly emailInputSelector: Locator;
  private readonly telephoneInputSelector: Locator;
  private readonly passwordInputSelector: Locator;
  private readonly confirmInputSelector: Locator;
  private readonly privacyPolicyInputSelector: Locator;
  private readonly continueButtonInputSelector: Locator;
  private readonly successMessageInputSelector: Locator;

  constructor(private page: Page) {
    this.page = page;
    this.hoverMyAccountDropdownMenuSelector = this.page.locator(
      "//a[@class='icon-left both nav-link dropdown-toggle']//span[contains(text(), 'My account')]"
    );
    this.clickRegisterLinkInputSelector = this.page.locator(
      "//a[@href='https://ecommerce-playground.lambdatest.io/index.php?route=account/register']"
    );
    this.firstNameInputSelector = this.page.locator("#input-firstname");
    this.lastnameInputSelector = this.page.locator("#input-lastname");
    this.emailInputSelector = this.page.locator("#input-email");
    this.telephoneInputSelector = this.page.locator("#input-telephone");
    this.passwordInputSelector = this.page.locator("#input-password");
    this.confirmInputSelector = this.page.locator("#input-confirm");
    this.privacyPolicyInputSelector = this.page.locator(
      "//label[@for='input-agree']"
    );
    this.continueButtonInputSelector = this.page.locator(
      "//input[@value='Continue']"
    );
    this.successMessageInputSelector = this.page.locator(
      "//h1[contains(text(), 'Your Account Has Been Created!')]"
    );
  }
  /**hover over My account dropdown menu */
  async hoverMyAccount(): Promise<void> {
    try {
      await this.hoverMyAccountDropdownMenuSelector.hover();
    } catch (error) {
      console.error(
        `Error while hovering over My account dropdown menu: ${error}`
      );
      throw error;
    }
  }

  //**click Register Link from My account dropdown menu */
  async clickRegisterLink(): Promise<void> {
    try {
      //click register link
      await this.clickRegisterLinkInputSelector.click();
    } catch (error) {
      let registerLink: string | null = await this.clickRegisterLinkInputSelector.textContent();
      console.error(`Error while clicking ${registerLink} link: ${error}`);
      throw error;
    }
  }

  /** generate random email */
  createEmail(): string {
    let randomNumbers: string = Math.trunc(Math.random() * 1000000).toString();
    return `${randomNumbers}@gmail.com`;
  }

  generateRandomPassword(): string {
    return Math.trunc(Math.random() * 1000000).toString();
  }

  /**Fill in Registration Account Form */
  async fillInRegistrationForm(regData: typeof RegistrationAccountData) {
    if (regData.registration === 0) {
      throw new Error(`Registration Account File is empty`);
    }
    //get current object
    const registrationInfo = regData.registration[0];
    //save current password
    let password: string = this.generateRandomPassword();
    let emailAddress: string = this.createEmail();

    //log email and password, for tracking purposes
    console.log(`Current email email: ${emailAddress}`);
    console.log(`Current user password: ${password}`);

    await this.firstNameInputSelector.fill(registrationInfo.firstname);
    await this.lastnameInputSelector.fill(registrationInfo.lastname);
    await this.emailInputSelector.fill(emailAddress);

    await this.telephoneInputSelector.fill(registrationInfo.telephone);
    //enter password
    await this.passwordInputSelector.fill(password);

    await this.confirmInputSelector.fill(password);
  }

  
}
