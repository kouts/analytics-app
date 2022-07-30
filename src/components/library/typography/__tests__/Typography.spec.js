import Typography from '../Typography.vue'
import { TypographyElements } from '../typography.constants'
import { mount } from '@vue/test-utils'

describe('Typography', () => {
  it('should be defined', () => {
    expect(Typography).toBeDefined()
  })

  describe('snapshots', () => {
    it('should render default as p element', () => {
      const component = _mount({})

      expect(component).toMatchSnapshot()
    })

    it.each(TypographyElements)('should render %s element', (as) => {
      const component = _mount({ as })

      expect(component).toMatchSnapshot()
    })

    it.each(['italic', 'bold', 'uppercase', 'underline', 'large'])('should render with %s', (prop) => {
      const component = _mount({ [prop]: true })

      expect(component).toMatchSnapshot()
    })
  })

  /**
   * Simple wrapper to avoid duplicated code
   */
  const _mount = (props) => {
    return mount(Typography, {
      propsData: props,
      slots: {
        default: 'Slot content'
      }
    })
  }
})
