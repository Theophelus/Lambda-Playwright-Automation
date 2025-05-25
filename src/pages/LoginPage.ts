import { expect, Locator, Page } from "@playwright/test";
import logger from "../utils/LoggerUtils";
import { HeaderComponents } from "../components/HeaderComponents";
import { AccountPage } from "../pages/AccountPage";
import { typeRequireText } from "../components/Inputs";
import { HelperComponents } from "../components/HelperComponents";
export class LoginPage {
  //define locators
  private readonly emailAddressInputSelector;
  private readonly passwordInputSelector;
  private readonly loginButtonSelector: Locator;
  private readonly returningCustomerTextSelector: Locator;
  private headerComponents: HeaderComponents;
  private readonly helper: HelperComponents;

  //create a constructor
  constructor(private page: Page) {
    this.page = page;

    this.headerComponents = new HeaderComponents(this.page);
    this.helper = new HelperComponents(this.page);
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
   * Consume and use hoverMyAccount() method from HeaderComponents class
   */

  async hoverMyAccount(): Promise<void> {
    await this.headerComponents.hoverMyAccount();
  }

  /**
   * Consume and use clickMyAccountLinks() method from HeaderComponents class
   */
  async clickLoginAccountLink(): Promise<void> {
    await this.headerComponents.clickMyAccountLinks("login");
  }

  /**
   * Verify Returning Customer header
   */
  async verifyReturnCustomerText(): Promise<void> {
    try {
      await expect(this.returningCustomerTextSelector).toBeVisible();
      logger.info('✅ "Returning Customer" header verified successfully.');
    } catch (error) {
      logger.error(
        `❌ Unable to verify: "Returning Customer" header.: ${error}`
      );
      throw error;
    }
  }
  /**
   * Fill in the login form with email and password
   */
  async fillInLoginForm(): Promise<void> {
    const user_email_address: string = process.env.email_address || "";
    const user_password: string = process.env.password || "";
    // fill user_email_address
    await typeRequireText(user_email_address, this.emailAddressInputSelector);
    //fill user_password
    await typeRequireText(user_password, this.passwordInputSelector);
  }

  async clickLoginBtn(): Promise<AccountPage> {
    try {
      await this.helper.elementHighlighter(this.loginButtonSelector);
      await this.loginButtonSelector.click({ timeout: 5000 });
      logger.info("✅ 'Login' button is clicked.");
    } catch (error) {
      logger.error(
        `❌ Something went wrong while clicking 'Login button': ${error}`
      );
      throw error;
    }

    const accountPage: AccountPage = new AccountPage(this.page);

    return accountPage;
  }
}
