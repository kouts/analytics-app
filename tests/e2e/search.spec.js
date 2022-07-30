const { test, expect } = require('@playwright/test')

test.describe('Search page', () => {
  test('it has the correct title', async ({ page }) => {
    await page.goto('#/search')
    await expect(page.locator('h1')).toContainText('Search')
  })

  test('search input receives focus with the "/" key', async ({ page }) => {
    await page.goto('#/search')
    await page.type('body', '/')
    await expect(page.locator('.search-bar-icon--shortcut')).not.toBeVisible
    const isFocused = await page.$eval('input[type="search"]', (el) => el === document.activeElement)

    expect(isFocused).toBe(true)
  })

  test('search input clears with the "esc" key', async ({ page }) => {
    await page.goto('#/search')
    await page.type('input[type="search"]', 'some text')
    await page.keyboard.press('Escape')
    const content = await page.inputValue('input[type="search"]')

    expect(content).toBe('')
  })

  test('search input clears with the "x" icon', async ({ page }) => {
    await page.goto('#/search')
    await page.type('input[type="search"]', 'some text')
    await page.click('.search-bar-icon--clear')
    const content = await page.inputValue('input[type="search"]')

    expect(content).toBe('')
  })

  test('items are filtered correctly', async ({ page }) => {
    await page.goto('#/search')
    const items = await page.$$('main ul li')

    expect(items.length).toBe(7)

    await page.type('input[type="search"]', 'ban')
    const newItems = await page.$$('main ul li')

    expect(newItems.length).toBe(1)
    await expect(page.locator('main ul li')).toContainText('Banana')
  })

  test('displays a message when search term does not exist in dataset', async ({ page }) => {
    await page.goto('#/search')
    const items = await page.$$('main ul li')

    expect(items.length).toBe(7)

    await page.type('input[type="search"]', 'test')
    const newItems = await page.$$('main ul li')

    expect(newItems.length).toBe(0)
    await expect(page.locator('.typography.typography--p.typography--bold')).toHaveText('No items found')
  })

  test('search input icons visibility', async ({ page }) => {
    await page.goto('#/search')
    await expect(page.locator('.search-bar-icon--shortcut')).toBeVisible()
    await expect(page.locator('.search-bar-icon--clear')).not.toBeVisible()

    await page.click('input[type="search"]')

    await expect(page.locator('.search-bar-icon--shortcut')).not.toBeVisible()
    await expect(page.locator('.search-bar-icon--clear')).not.toBeVisible()

    await page.type('input[type="search"]', 'test')

    await expect(page.locator('.search-bar-icon--shortcut')).not.toBeVisible()
    await expect(page.locator('.search-bar-icon--clear')).toBeVisible()

    await page.click('.search-bar-icon--clear')

    await expect(page.locator('.search-bar-icon--shortcut')).toBeVisible()
    await expect(page.locator('.search-bar-icon--clear')).not.toBeVisible()
  })
})
