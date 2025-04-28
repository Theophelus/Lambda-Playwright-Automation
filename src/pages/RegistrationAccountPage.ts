import { expect, Locator, Page } from "@playwright/test";
import logger from "../utils/LoggerUtils";
const RegistrationAccountData = require("../data/registrationAccountData.json");
import saveCreds from "../utils/SaveCredsUtils";

export class RegistrationAccountPage {
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
      logger.info("✅ successfully hovered over 'My account' dropdown menu.");
    } catch (error) {
      logger.error(
        `❌ Error while hovering over My account dropdown menu: ${error}`
      );
      throw error;
    }
  }

  //**click Register Link from My account dropdown menu */
  async clickMyAccountLinks(): Promise<void> {
    try {
      //click register link
      await this.clickRegisterLinkInputSelector.click();
      logger.info(
        "✅ clicking 'Register' link from 'My account' dropdown menu."
      );
    } catch (error) {
      let registerLink: string | null =
        await this.clickRegisterLinkInputSelector.textContent();
      logger.error(`❌ Error while clicking ${registerLink} link: ${error}`);
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
    if (regData.registration.length === 0) {
      throw new Error(`✅ Registration Account File is empty`);
    }
    //get current object
    const registrationInfo = regData.registration[0];
    //save current password and email
    let password: string = this.generateRandomPassword();
    let emailAddress: string = this.createEmail();

    //fill form
    try {
      await this.firstNameInputSelector.fill(registrationInfo.firstname);
      await this.lastnameInputSelector.fill(registrationInfo.lastname);
      await this.emailInputSelector.fill(emailAddress);

      await this.telephoneInputSelector.fill(registrationInfo.telephone);
      //enter password and confirm password
      await this.passwordInputSelector.fill(password);
      await this.confirmInputSelector.fill(password);
      logger.info("✅ Registration Account Form is Filled successfully.");
    } catch (error) {
      logger.error(`❌ Something went wrong while filling the form.: ${error}`);
      throw error;
    }

    //save new credentials
    const credentials: Map<string, string> = new Map<string, string>();
    credentials.set("email_address", emailAddress);
    credentials.set("password", password);
    saveCreds(credentials);
  }

  /**Accept Private Policy */
  async checkPrivatePolicy(): Promise<void> {
    try {
      await this.privacyPolicyInputSelector.check();
      logger.info("✅ 'Private Policy' checkbox is checked successfully.");
    } catch (error) {
      logger.error(`❌ Error while checking private policy: ${error}`);
      throw error;
    }
  }

  /**
   * Click continue button
   */
  async clickContinueBtn(): Promise<void> {
    try {
      await this.continueButtonInputSelector.click();
      logger.info("✅ 'Continue' button is clicked.");
    } catch (error) {
      logger.error(`❌ Error while clicking continue button: ${error}`);
      throw error;
    }
  }

  /**
   * Verify Registration Account is created successfully
   */
  async verifySuccessMessage(): Promise<void> {
    try {
      await expect(this.successMessageInputSelector).toBeVisible({
        timeout: 5000,
      });
      logger.info(`✅ Your Account Has Been Created: message is displayed`);
    } catch (error) {
      logger.error(
        `❌ Your Account Has Been Created: message is not displayed!: ${error}`
      );
      throw error;
    }
  }
  /**
   * Verify Page title
   */

  async verifyPageTitle(page_title: string): Promise<void> {
    try {
      await expect(this.page).toHaveTitle(page_title);
      logger.info(`✅ ${page_title}: title is verified:`);
    } catch (error) {
      logger.error(`❌ Unable to verify page title: ${error}`);
      throw error;
    }
  }
}
