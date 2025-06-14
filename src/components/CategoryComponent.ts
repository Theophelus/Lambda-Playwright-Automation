import { expect, Locator, Page } from "@playwright/test";
import logger from "../utils/LoggerUtils";
import { HelperComponents } from "./HelperComponents";
/**
 * @method to click shop by category
 */
export async function clickSpecificCategory(category_name: string,locator: Locator,page: Page): Promise<void> {
  //import Helper Component
  const helper = new HelperComponents(page);
  //apply playwright filter to find a specific category to be clicked by name
  const category_filter = locator.filter({ hasText: category_name });

  //check if cartegory elements were found
  if ((await category_filter.count()) === 0) {
    logger.warn(`⚠️ Cartegory is  is not`);
    return;
  }

  try {
    if ((await category_filter.count()) > 0) {
      await helper.elementHighlighter(category_filter);
      await category_filter.click();
      logger.info(`✅ ${await category_filter.innerText()} is clicked.`);
    }
  } catch (error) {
    logger.error(`❌ Error while trging to click ${await category_filter.innerText()}: ${error}`);
    throw error;
  }
}
