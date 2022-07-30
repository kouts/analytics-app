import SearchBar from '../SearchBar.vue'
import { mount } from '@vue/test-utils'

describe('Search Bar', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(SearchBar)
  })

  it('should be defined', () => {
    expect(SearchBar).toBeDefined()
  })

  it('should show fire an update event when text changes', async () => {
    const inputSearch = wrapper.find('input[type="search"]')

    await inputSearch.setValue('some search text')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().update).toBeTruthy()
    expect(wrapper.emitted().update[0]).toEqual(['some search text'])
  })

  it('should show an "x" icon when it has focus and contains a value', async () => {
    const inputSearch = wrapper.find('input[type="search"]')

    await inputSearch.setValue('some search text')
    inputSearch.trigger('focus')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.search-bar-icon--clear').isVisible()).toBe(true)
  })

  it('should clear the text when clicking on the "x" icon', async () => {
    const inputSearch = wrapper.find('input[type="search"]')

    await inputSearch.setValue('some search text')
    inputSearch.trigger('focus')
    await wrapper.vm.$nextTick()
    wrapper.find('.search-bar-icon--clear').trigger('mousedown')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('input[type="search"]').element.value).toBe('')
    expect(wrapper.vm.searchText).toBe('')
  })

  it('should have a custom placeholder text', async () => {
    const customWrapper = mount(SearchBar, {
      attrs: {
        placeholder: 'custom placeholder text'
      }
    })
    const inputSearch = customWrapper.find('input[type="search"]')

    expect(inputSearch.attributes().placeholder).toBe('custom placeholder text')
  })

  it('should get focus when the "/" key is pressed', async () => {
    const customWrapper = mount(SearchBar, {
      attachTo: document.body
    })

    customWrapper.trigger('keydown', {
      key: '/'
    })
    await customWrapper.vm.$nextTick()
    expect(customWrapper.find('input[type="search"]').element).toBe(document.activeElement)
  })

  describe('snapshots', () => {
    it('should render a search input', async () => {
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
