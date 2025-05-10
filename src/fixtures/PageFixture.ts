import { test as base } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { RegistrationAccountPage } from "../pages/RegistrationAccountPage";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";
import logger from "../utils/LoggerUtils";

// define fixture type
type LambdaFixture = {
  homePage: HomePage;
  registrationAccountPage: RegistrationAccountPage;
  loginPage: LoginPage;
  productsPage: ProductsPage;
};

// extends base test with fixture

export const test = base.extend<LambdaFixture>({
  // page fixtures
  homePage: async ({ page }, use) => {
    try {
      const homePage = new HomePage(page);
      await use(homePage);
    } catch (error) {
      logger.error(`❌ Error while initializing HomePAge: ${error}`);
      throw error;
    }
  },

  registrationAccountPage: async ({ page }, use) => {
    try {
      const registrationAccountPage = new RegistrationAccountPage(page);
      await use(registrationAccountPage);
    } catch (error) {
      logger.error(
        `❌ Error while initializing RegistrationAccountPage: ${error}`
      );
      throw error;
    }
  },

  loginPage: async ({ page }, use) => {
    try {
      const loginPage = new LoginPage(page);
      await use(loginPage);
    } catch (error) {
      logger.error(`❌ Error while initializing LoginPage: ${error}`);
      throw error;
    }
  },

  productsPage: async ({ page }, use) => {
    try {
      const productsPage = new ProductsPage(page);
      await use(productsPage);
    } catch (error) {
      logger.error(`❌ Error while initializing ProductPage: ${error}`);
      throw error;
    }
  },
});

//export expect for assertions, thi will allow to still execute assertions on test level
export { expect } from "@playwright/test";
