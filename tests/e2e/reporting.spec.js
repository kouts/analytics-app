const { test, expect } = require('@playwright/test')

test.describe('Reporting page', () => {
  test('it has the correct title', async ({ page }) => {
    await page.goto('#/')
    await expect(page.locator('h1')).toContainText('Reporting')
  })

  test('checks are loaded', async ({ page }) => {
    await page.goto('/')
    const checkRows = await page.$$('tr')

    expect(checkRows.length).toBeGreaterThan(5)
  })

  test('a stat is loaded', async ({ page }) => {
    await page.goto('/')
    await page.click('table.table-borderless tr:first-child button.btn-transparent')
    await expect(page.locator('tr.expanded').first()).toBeVisible()

    const chart = await page.$$('tr.expanded svg.highcharts-root')
    const chartSeries = await page.$$('tr.expanded .highcharts-series-group')

    expect(chart.length).toBe(1)
    expect(chartSeries.length).toBe(1)
  })

  test('response time chart buttons work', async ({ page }) => {
    await page.goto('/')
    await page.click('table.table-borderless tr:first-child button.btn-transparent')
    await expect(page.locator('tr.expanded').first()).toBeVisible()

    // Check that all series are populated
    const series = await page.$$('tr.expanded .highcharts-series-group .highcharts-series')

    for (const s of series) {
      const inner = await s.innerHTML()

      expect(inner).not.toBe('')
    }

    // Deactivate series
    await page.click('button:has-text("p99")')
    const innerp99 = await series[0].innerHTML()

    expect(innerp99).toBe('')

    await page.click('button:has-text("p95")')
    const innerp95 = await series[1].innerHTML()

    expect(innerp95).toBe('')

    await page.click('button:has-text("avg")')
    const inneravg = await series[2].innerHTML()

    expect(inneravg).toBe('')

    // Activate series
    await page.click('button:has-text("p99")')
    const innerp99Active = await series[0].innerHTML()

    expect(innerp99Active).not.toBe('')

    await page.click('button:has-text("p95")')
    const innerp95Active = await series[1].innerHTML()

    expect(innerp95Active).not.toBe('')

    await page.click('button:has-text("avg")')
    const inneravgActive = await series[2].innerHTML()

    expect(inneravgActive).not.toBe('')
  })

  test('the success button works', async ({ page }) => {
    await page.goto('/')
    await page.click('table.table-borderless tr:first-child button.btn-transparent')
    await expect(page.locator('tr.expanded').first()).toBeVisible()

    await page.click('button:has-text("Success")')

    // Check that only the first series is populated
    const series = await page.$$('tr.expanded .highcharts-series-group .highcharts-series')

    for (let index = 0; index < series.length; index++) {
      const s = series[index]
      const inner = await s.innerHTML()

      if (index === 0) {
        expect(inner).not.toBe('')
      } else {
        expect(inner).toBe('')
      }
    }
  })
})
