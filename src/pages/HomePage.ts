import { Page } from "@playwright/test";
import logger from "../utils/LoggerUtils";

export class HomePage {
  constructor(private page: Page) {
    this.page = page;
  }

  /**
   * Navigate to home page
   */

  async navigate(): Promise<void> {
    try {
      await this.page.goto("/", { waitUntil: "domcontentloaded" });
      logger.info("✅ Navigating to the home page");
    } catch (error) {
      logger.error(
        `❌ Something went wrong navigate to: ${"https://ecommerce-playground.lambdatest.io/index.php?route=common/home"}: ${error} `
      );
      throw error;
    }
  }
}
