import { expect, Locator, Page } from "@playwright/test";
import logger from "../utils/LoggerUtils";

export default class LoginPage {
  //define locators
  private readonly emailAddressInputSelector;
  private readonly passwordInputSelector;
  private readonly loginButtonSelector: Locator;
  private readonly returningCustomerTextSelector: Locator;

  //create a constructor
  constructor(private page: Page) {
    this.page = page;
    this.emailAddressInputSelector = this.page.getByLabel("E-Mail Address");
    this.passwordInputSelector = this.page.getByLabel("Password");
    this.loginButtonSelector = this.page.locator(
      "//input[@class='btn btn-primary']"
    );
    this.returningCustomerTextSelector = this.page.locator(
      "//h2[contains(text(), 'Returning Customer')]"
    );
  }

  /**
   * Verify Returning Customer header
   */
  async verifyReturnCustomerText(): Promise<void> {
    await expect(this.returningCustomerTextSelector).toBeVisible({
      timeout: 2000,
    });
  }
  /**
   * Fill in the login form with email and password
   */

  async fillInLoginForm(): Promise<void> {
    const user_email_address: string = process.env.email_address || "";
    const user_password: string = process.env.password || "";

    // fill user_email_address
    await this.typeRequireValues(user_email_address,this.emailAddressInputSelector);
    //fill user_password
    await this.typeRequireValues(user_password, this.passwordInputSelector);
  }

  /**
   * type required values, email and password
   */
  async typeRequireValues(element: string, locator: Locator): Promise<void> {
    try {
      let getCurrentValue = await locator.getAttribute("value");

      if (getCurrentValue !== null) {
        await locator.clear();
      }

      await locator.fill(element);
      logger.info("Input field filled successfully:");
    } catch (error) {
      logger.error(`Input fiald not filled successfully: ${error}`);
      throw error;
    }
  }
}
