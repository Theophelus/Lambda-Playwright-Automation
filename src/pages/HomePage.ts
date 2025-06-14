import { Page } from "@playwright/test";
import logger from "../utils/LoggerUtils";
import { PageComponents } from "./PageComponents";
import { HeaderComponents } from "../components/HeaderComponents";
import { NavigationComponent } from "../components/NavigationComponent";

export class HomePage {
  private readonly components: PageComponents;

  constructor(private page: Page) {
    this.page = page;
    this.components = {
      header: new HeaderComponents(this.page),
      navigation: new NavigationComponent(this.page),
    };
  }

  /**
   * Navigate to home page
   */

  async navigate(): Promise<void> {
    try {
      await this.components.navigation?.navigateToHomePage();
      await this.components.navigation?.waitForLoadState();
      logger.info("✅ Navigating to the home page");
    } catch (error) {
      logger.error(
        `❌ Something went wrong navigate to: ${"https://ecommerce-playground.lambdatest.io/index.php?route=common/home"}: ${error} `
      );
      throw error;
    }
  }


  async verifyMyAccountLinksAfterLogin(expected_results: string[]) {
    await this.components.header?.myAccountDropDownLinksAsCustomer(
      expected_results
    );
  }
}
