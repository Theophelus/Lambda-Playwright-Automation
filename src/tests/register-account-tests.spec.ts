import { test, expect } from "@playwright/test";
import RegistrationAccountPage from "../pages/RegistrationAccountPage";
import logger from "../utils/LoggerUtils";

const registrationAccountData = require("../data/registrationAccountData.json");

test("Users should be able to register to Lambda Play pen", async ({ page }) => {
  //check reg state is created already
  let registration_already_ran: boolean;
  registration_already_ran = process.env.registration_test_completed === "true";

  if (registration_already_ran) {
    logger.info("✅ Registration for this user already completed..!");
    test.skip(true, "Registration already completed.");
  }

  const registrationAccountPage = new RegistrationAccountPage(page);
  // Initiator
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await registrationAccountPage.hoverMyAccount();
  await registrationAccountPage.clickMyAccountLinks();

  //verify if landed on the correct page
  await expect(page).toHaveTitle("Register Account");

  // Fill the form
  await registrationAccountPage.fillInRegistrationForm(registrationAccountData);

  //accepting Private policy and clicking continue button
  await registrationAccountPage.checkPrivatePolicy();
  await registrationAccountPage.clickContinueBtn();

  //assertions
  await registrationAccountPage.verifySuccessMessage();
});
