import Checks from '../Checks.vue'
import { fetchCheckStats } from '@/api/check-stats'
import { fetchChecks } from '@/api/checks'
import { mount, shallowMount } from '@vue/test-utils'

const fetchChecksResponse = [
  {
    id: '2b22c08d-b681-43c5-8b23-f49f6168bafe',
    name: 'Check 0',
    type: 'API',
    success: 0.49646666666666667,
    avg: 498.5661333333333,
    p95: 951,
    p99: 990
  }
]

const fetchCheckStatsResponse = [
  {
    checkId: '2b22c08d-b681-43c5-8b23-f49f6168bafe',
    success: 0.3333333333333333,
    avg: 652.3333333333334,
    p95: 781.8,
    p99: 785.16,
    timestamp: 1631019600000
  }
]

jest.mock('@/api/checks', () => ({
  fetchChecks: jest.fn(() => Promise.resolve([]))
}))

jest.mock('@/api/check-stats', () => ({
  fetchCheckStats: jest.fn(() => Promise.resolve([]))
}))

describe('Checks', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(Checks).toBeDefined()
  })

  it('should display a message when there are no checks available', async () => {
    const wrapper = mount(Checks)

    fetchChecks.mockImplementation(() => Promise.resolve([]))
    await wrapper.vm.$nextTick()

    expect(wrapper.find('h3').text()).toBe('No results found')
  })

  it('does not call the fetch stats method upon initialization', async () => {
    fetchChecks.mockImplementation(() => Promise.resolve(fetchChecksResponse))
    fetchCheckStats.mockImplementation(() => Promise.resolve(fetchCheckStatsResponse))
    const wrapper = shallowMount(Checks)

    await wrapper.vm.$nextTick()

    expect(fetchCheckStats).not.toHaveBeenCalled()
  })

  it('calls the fetch stats method when the table row expands', async () => {
    fetchChecks.mockImplementation(() => Promise.resolve(fetchChecksResponse))
    fetchCheckStats.mockImplementation(() => Promise.resolve(fetchCheckStatsResponse))
    const wrapper = shallowMount(Checks)

    await wrapper.vm.$nextTick()
    const item = wrapper.find('button.btn-transparent')

    await item.trigger('click')
    await wrapper.vm.$nextTick()

    expect(fetchCheckStats).toHaveBeenCalled()
  })

  it('renders the stats component when the table row expands', async () => {
    fetchChecks.mockImplementation(() => Promise.resolve(fetchChecksResponse))
    fetchCheckStats.mockImplementation(() => Promise.resolve(fetchCheckStatsResponse))
    const wrapper = shallowMount(Checks)

    await wrapper.vm.$nextTick()
    const item = wrapper.find('button.btn-transparent')

    await item.trigger('click')
    await wrapper.vm.$nextTick()

    const row = item.element.parentNode.parentNode
    const nextRow = row.parentNode.rows[row.rowIndex + 1]

    expect(nextRow.className).toBe('expanded')
    expect(nextRow.querySelector('checkstats-stub')).toBeInstanceOf(HTMLElement)
  })

  describe('snapshots', () => {
    it('should render correctly', async () => {
      fetchChecks.mockImplementation(() => Promise.resolve(fetchChecksResponse))
      const wrapper = mount(Checks)

      await wrapper.vm.$nextTick()

      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
