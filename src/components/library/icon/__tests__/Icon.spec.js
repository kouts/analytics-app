import Icon from '../Icon.vue'
import { mount } from '@vue/test-utils'

describe('Icon', () => {
  it('should be defined', () => {
    expect(Icon).toBeDefined()
  })

  describe('snapshots', () => {
    it('should render with an icon', () => {
      const component = _mount({ name: 'alert' })

      expect(component).toMatchSnapshot()
    })

    it('should render with a custom width', () => {
      const component = _mount({ name: 'alert', width: 30 })

      expect(component).toMatchSnapshot()
    })
  })

  it('should thrown an error if icon not found', () => {
    const missingIcon = 'my-icon'
    const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {})

    try {
      _mount({ name: missingIcon })
    } catch (error) {
      expect(error.message).toEqual(`${missingIcon} is not an octicon icon`)
    } finally {
      spy.mockRestore()
    }
  })

  /**
   * Simple wrapper to avoid duplicated code
   */
  const _mount = (props) => {
    return mount(Icon, {
      propsData: props
    })
  }
})
