import { test, expect } from "../fixtures/PageFixture";
import logger from "../utils/LoggerUtils";
import saveCreds from "../utils/SaveCredsUtils";

const registrationAccountData = require("../data/registrationAccountData.json");

test("Users should be able to register to Lambda Play pen", async ({
  homePage,
  registrationAccountPage,
}) => {
  //check reg state is created already
  let registration_already_ran: any;
  registration_already_ran = process.env.registration_test_completed === "true";

  if (registration_already_ran) {
    logger.info("✅ Registration for this user already completed..!");
    test.skip(true, "Registration already completed.");
  }

  // Initiator
  await homePage.navigate();
  await registrationAccountPage.hoverMyAccount();
  await registrationAccountPage.clickMyAccountLinks();

  //verify if landed on the correct page
  await registrationAccountPage.verifyPageTitle("Register Account");

  // Fill the form
  await registrationAccountPage.fillInRegistrationForm(registrationAccountData);

  //accepting Private policy and clicking continue button
  await registrationAccountPage.checkPrivatePolicy();
  await registrationAccountPage.clickContinueBtn();

  //assertions
  await registrationAccountPage.verifySuccessMessage();

  /**
   * if registration state is false on .env file then this code will run to update to true
   */
  const registration_state: Map<string, string> = new Map<string, string>();
  registration_already_ran = "true";
  registration_state.set(
    "registration_test_completed",
    registration_already_ran
  );
  saveCreds(registration_state);
});
