import { test, expect } from "@playwright/test"

test("search works", async ({ page }) => {
	await page.goto("/")
	await page.type("input", "Word Search")
	await expect(page.locator("section")).toBeVisible()
	await expect(page.locator("section a h1")).toHaveText("Word Search")
})

/*
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const title = page.locator('.navbar__inner .navbar__title');
  await expect(title).toHaveText('Playwright');
});
*/

test.describe.parallel("trollarweb", async () => {
	test.beforeEach(({ page }) => page.goto("/tools/start"))
	test("you can search duckduckgo", async ({ page }) => {
		await page.locator('a[role="listitem"]:has-text("DuckDuckGo")').click()
		expect(page.url()).toMatch("http://localhost:3000/tools/start?engine=DuckDuckGo")
		await page.type("input", "this is a unit test")
		const [page1] = await Promise.all([
			page.waitForEvent("popup"),
			page.locator('input[name="q"]').press("Enter"),
		])
		expect(page1.url()).toMatch("https://duckduckgo.com/?q=this+is+a+unit+test&t=h_&ia=web")
	})
	test("you can search troll (so meta!)", async ({ page }) => {
		await page.locator('a[role="listitem"]:has-text("troll")').click()
		expect(page.url()).toMatch("http://localhost:3000/tools/start?engine=troll")
		await page.type("input", "this is a unit test")
		const [page1] = await Promise.all([
			page.waitForEvent("popup"),
			page.locator('input[name="q"]').press("Enter"),
		])

		expect(page1.url()).toMatch("http://localhost:3000/?q=this+is+a+unit+test&t=h_&ia=web")
	})
	test("you can dox azulx", async ({ page }) => {
		await page.locator('a[role="listitem"]:has-text("OpenCorporates")').click()
		expect(page.url()).toMatch("http://localhost:3000/tools/start?engine=OpenCorporates")
		await page.locator("text=Officers").click()
		await page.locator('input[name="q"]').fill("ERDIT LLUGIQI")
		const [page1] = await Promise.all([
			page.waitForEvent("popup"),
			page.locator('input[name="q"]').press("Enter"),
		])

		expect(page1.url()).toMatch("https://opencorporates.com/officers?ia=web&q=ERDIT+LLUGIQI&t=h_")
	})
})
