import { test, expect, type Page } from "@playwright/test";

test.describe("Test creation of event:", () => {
  const date = new Date("August 14 2020 00:00:00");
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = 10;
  const minutes = 30;
  test.beforeEach(async ({ page }) => {
    // Pick the new/fake "now" for you test pages.
    const fakeNow = date.valueOf();

    // Update the Date accordingly in your test pages
    await page.addInitScript(`{
      Date = class extends Date {
        constructor(...args) {
          if (args.length === 0) {
            super(${fakeNow});
          } else {
            super(...args);
          }
        }
      }
      // Override new Date() to start from fakeNow
      const __DateNowOffset = ${fakeNow} - new Date();
      const __DateNow = Date.now;
      Date.now = () => __DateNow() + __DateNowOffset;
    }`);
    await page.goto("http://localhost:5173/");
  });

  const title = "Event Title";
  const description = "Some text";

  test("Page should load", async ({ page }) => {
    await expect(page).toHaveTitle("Google Calendar");
  });

  test("Dialog should load on button click", async ({ page }) => {
    await page.getByText("Create").click();
    await expect(page.getByTestId("form-dialog")).toBeVisible();
  });

  test("Should display and delete event", async ({ page }) => {
    await expect(page.getByText(title)).not.toBeVisible();
    await expect(page.getByText("10:30am - 12:30pm")).not.toBeVisible();
    await expect(page.getByText(description)).not.toBeVisible();

    await page.getByText("Create").click();

    await page.getByTestId("form-title").fill(title);
    await page
      .getByTestId("form-start")
      .type(`00${year}${month}${day}${hour}${minutes}`);
    await page
      .getByTestId("form-end")
      .type(`00${year}${month}${day}${hour + 2}${minutes}`);
    await page.getByTestId("form-desc").type(description);
    await page.getByTestId("form-submit").click();

    // Show in week view
    await expect(page.getByText(title)).toBeVisible();
    await expect(page.getByText("10:30am - 12:30pm")).toBeVisible();
    await expect(page.getByText(description)).toBeVisible();

    // Show in month view
    await page.getByText("week", { exact: true }).click();
    await page.getByText("month").click();
    await page.getByText(title).click();
    await page.getByText("Delete Event").click();

    await expect(page.getByText(title)).not.toBeVisible();
  });
  test("Should navigate to future week and correctly create/show new event in future", async ({
    page,
  }) => {
    const newDay = "25";
    const shiftMonths = 2;
    await page.goto("http://localhost:5173/");
    await page.getByText("Create").click();

    await page.getByTestId("form-title").fill(title);
    await page
      .getByTestId("form-start")
      .type(`00${year}${month + shiftMonths}${newDay}${hour}${minutes}`);
    await page
      .getByTestId("form-end")
      .type(`00${year}${month + shiftMonths}${newDay}${hour + 2}${minutes}`);
    await page.getByTestId("form-desc").type(description);
    await page.getByTestId("form-submit").click();

    await page.getByTestId("mini-next").click({ clickCount: 1 });
    await page.getByTestId("mini-next").click({ clickCount: 1 });
    await page.getByText(newDay).click();
    await expect(page.getByText("October 2020")).toHaveCount(2);
    await expect(page.getByText(newDay)).toHaveCount(2);
    await expect(page.getByText(title)).toBeVisible();
    await page.getByText(title).click();
    await page.getByText("Delete Event").click();
    await expect(page.getByText(title)).not.toBeVisible();
  });
});
