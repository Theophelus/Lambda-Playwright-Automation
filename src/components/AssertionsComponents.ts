import { expect, Locator, Page } from "@playwright/test";

export class AssertionsComponents {
  constructor(private page: Page) {}

  //asset locator to be visible
  async assertVesible(locator: Locator, setTimeout?: number): Promise<void> {
    await expect(locator).toBeVisible({ timeout: setTimeout});
  }
  //assert specific value to be equal to expected value
  async assertToBe(actual_value: string,expectedValue: string): Promise<void> {
    expect(actual_value).toBe(expectedValue)
  }
  //expected element to have expected text
  async assertToHaveText(locator: Locator, expectedValue: string
  ): Promise<void> {
    await expect(locator).toHaveText(expectedValue);
  }
}
