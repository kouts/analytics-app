import LoadingSpinner from '../LoadingSpinner.vue'
import { mount } from '@vue/test-utils'

describe('Loading Spinner', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(LoadingSpinner)
  })

  it('should be defined', () => {
    expect(LoadingSpinner).toBeDefined()
  })

  it('should show depending on the "show" prop', async () => {
    await wrapper.setProps({
      show: true
    })
    expect(wrapper.find('div.loader').exists()).toBe(true)
  })

  it('should hide depending on the "show" prop', async () => {
    await wrapper.setProps({
      show: false
    })
    expect(wrapper.find('div.loader').exists()).toBe(false)
  })

  it('should render with the right size', async () => {
    await wrapper.setProps({
      show: true,
      width: 4,
      size: 32
    })
    expect(wrapper.find('div.loader').attributes().style).toBe('border-width: 4px; width: 32px; height: 32px;')
  })

  describe('snapshots', () => {
    it('should render a loading spinner', async () => {
      await wrapper.setProps({ show: true })
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
