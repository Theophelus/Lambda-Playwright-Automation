import { test, expect } from "@playwright/test";
import RegistrationAccountPage from "../pages/RegistrationAccountPage";

const registrationAccountData = require("../data/registrationAccountData.json");

test("Users should be able to register to Lambda Play pen", async ({
  page,
}) => {
  const registrationAccountPage = new RegistrationAccountPage(page);

  // Initiator
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await registrationAccountPage.hoverMyAccount();
  await registrationAccountPage.clickMyAccountLinks();

  //verify if landed on the correct page
  await expect(page).toHaveTitle("Register Account");

  // Fill the form
  await registrationAccountPage.fillInRegistrationForm(registrationAccountData);
  await registrationAccountPage.clickContinueBtn();
  
  //assertions
  await registrationAccountPage.verifySuccessMessage();
});
