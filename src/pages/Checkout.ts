import { Locator, Page } from "@playwright/test";
import { PageComponents } from "./PageComponents";
import { AssertionsComponents } from "../components/AssertionsComponents";
import logger from "../utils/LoggerUtils";
import { HelperComponents } from "../components/HelperComponents";

export class Checkout {
  //define locators
  private readonly billingAddrssSelector: Locator;
  //define components interface
  private readonly components: PageComponents;

  constructor(private page: Page) {
    this.page = page;
    //initialize locators
    this.billingAddrssSelector = page.getByRole("heading", {
      name: "Billing Address",
    });

    //initialize components
    this.components = {
      assertions: new AssertionsComponents(this.page),
      helper: new HelperComponents(this.page),
    };
  }
  //verfiy Billing Address header
  async verifyBillingAddressHeader() {
    try {
      await this.components.assertions?.assertVesible(this.billingAddrssSelector);
      //highlight Billing Address element
      await this.components.helper?.elementHighlighter(this.billingAddrssSelector);
      logger.info(`${await this.billingAddrssSelector.innerText()} is verified successfuly.`);
    } catch (error) {
      logger.error(`${await this.billingAddrssSelector.innerText()} could not be verified: {error`);
      throw error;
    }
  }
}
