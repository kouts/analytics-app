const { test, expect } = require('@playwright/test')

const hasClass = async (cssClass, selector, page) => {
  const classList = await page.$eval(selector, (node) => [...node.classList])

  return classList.includes(cssClass)
}

test.describe('App', () => {
  test('navigation through the sidebar', async ({ page }) => {
    await page.goto('#/')
    await expect(await hasClass('active', 'a.nav-link:has-text("Reporting")', page)).toEqual(true)
    await expect(page.locator('h1')).toContainText('Reporting')

    await page.click('a.nav-link:has-text("Search")')
    await expect(page).toHaveURL(/#\/search$/)
    await expect(await hasClass('active', 'a.nav-link:has-text("Search")', page)).toEqual(true)
    await expect(page.locator('h1')).toContainText('Search')

    await page.click('a.nav-link:has-text("Events")')
    await expect(page).toHaveURL(/#\/events$/)
    await expect(await hasClass('active', 'a.nav-link:has-text("Events")', page)).toEqual(true)
    await expect(page.locator('h1')).toContainText('Page not found')

    await page.click('a.nav-link:has-text("Reporting")')
    await expect(page).toHaveURL(/#\/$/)
    await expect(await hasClass('active', 'a.nav-link:has-text("Reporting")', page)).toEqual(true)
    await expect(page.locator('h1')).toContainText('Reporting')
  })

  test('page not found', async ({ page }) => {
    await page.goto('#/unknown-page')

    await expect(page.locator('h1')).toContainText('Page not found')
  })
})
