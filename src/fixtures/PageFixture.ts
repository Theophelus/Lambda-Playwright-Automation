import { test as base } from "@playwright/test";
import { RegistrationAccountPage } from "../pages/RegistrationAccountPage";
import { LoginPage } from "../pages/LoginPage";
import logger from "../utils/LoggerUtils";

// define fixture type
type LambdaFixture = {
  registrationAccountPage: RegistrationAccountPage;
  loginPage: LoginPage;
};

// extends base test with fixture

export const test = base.extend<LambdaFixture>({
  // page fixtures
  registrationAccountPage: async ({ page }, use) => {
    try {
      const registrationAccountPage = new RegistrationAccountPage(page);
      await use(registrationAccountPage);
    } catch (error) {
      logger.error(
        `❌ Error while initializing RegistrationAccountPage: ${error}`
      );
    }
  },

  loginPage: async ({ page }, use) => {
    try {
      const loginPage = new LoginPage(page);
      await use(loginPage);
    } catch (error) {
      logger.error(`❌ Error while initializing LoginPage: ${error}`);
    }
  },
});

//export expect for assertions, thi will allow to still execute assertions on test level

export { expect } from "@playwright/test";
