import { expect, Locator } from "@playwright/test";
import logger from "../utils/LoggerUtils";

/**
 * @method to click shop by category
 */
export async function clickSpecificCategory(category_name: string, locator: Locator):Promise<void> {
  
    //apply playwright filter to find a specific category to be clicked by name
  const category_filter = locator.filter({ hasText: category_name });

  try {
    if ((await category_filter.count()) > 0) {
      await category_filter.click();
      logger.info(`✅ ${await category_filter.innerText()} is clicked.`);
    }
  } catch (error) {
    logger.error(
      `❌ Error while trging to click ${await category_filter.innerText()}: ${error}`
    );
    throw error;
  }
}
