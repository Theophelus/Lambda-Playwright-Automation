import { Locator } from "@playwright/test";
import logger from "../utils/LoggerUtils";

/**
 * type required values, email and password
 */
export async function typeRequireText(element: string, locator: Locator): Promise<void> {
  try {

    await locator.waitFor({ state: "visible", timeout: 7000 });

    await locator.click();
    await locator.fill(element);
    logger.info("✅ Input field filled successfully:");
  } catch (error) {
    logger.error(`❌ Input fiald not filled successfully: ${error}`);
    throw error;
  }
}
