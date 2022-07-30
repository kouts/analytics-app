import SearchBar from './SearchBar.vue'
import Typography from '../typography'

export default {
  title: 'Design System/Search Bar',
  component: SearchBar
}

export const Default = () => ({
  components: { SearchBar },
  template: `
    <SearchBar />
  `
})

export const Placeholder = () => ({
  components: { SearchBar },
  template: `
    <SearchBar placeholder="Search here..." />
  `
})

Placeholder.parameters = {
  docs: {
    description: {
      story: 'Use the `placeholder` attribute as you would do on a "normal" search input.'
    }
  }
}

export const UpdateEvent = () => ({
  components: { SearchBar, Typography },
  template: `
  <div>
    <SearchBar @update=updateSearchText />
    <ul>
      <li v-for="item in filteredItems" :key="item">
        <Typography as="span">
          {{ item }}
        </Typography>
      </li>
    </ul>
  </div>
  `,
  data() {
    return {
      searchText: '',
      items: ['Banana', 'Apple', 'Orange', 'Pear']
    }
  },
  methods: {
    updateSearchText(e) {
      this.searchText = e
    }
  },
  computed: {
    filteredItems() {
      return this.items.filter((item) => item.toLowerCase().includes(this.searchText.toLowerCase()))
    }
  }
})

UpdateEvent.parameters = {
  docs: {
    description: {
      story: 'You can get the search text value by listening to the `update` event.'
    }
  }
}
