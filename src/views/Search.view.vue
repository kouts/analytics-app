<template>
  <div>
    <Typography as="h1" class="mb-2">Search</Typography>
    <Typography as="p" class="mb-4 pb-2"> Test page for the <code>SearchBar</code> component. </Typography>
    <div>
      <SearchBar class="mb-2" placeholder="Search a fruit..." @update="updateSearchText" />
      <ul v-if="filteredItems.length" class="px-3">
        <li v-for="item in filteredItems" :key="item">
          <Typography as="span">
            {{ item }}
          </Typography>
        </li>
      </ul>
      <Typography v-else as="p" bold>No items found</Typography>
    </div>
  </div>
</template>

<script>
import SearchBar from '@/components/library/search-bar'
import Typography from '@/components/library/typography'

export default {
  components: {
    Typography,
    SearchBar
  },
  data() {
    return {
      searchText: '',
      items: ['Banana', 'Apple', 'Orange', 'Pear', 'Cherry', 'Grapefruit', 'Peach']
    }
  },
  computed: {
    filteredItems() {
      return this.items.filter((item) => item.toLowerCase().includes(this.searchText.toLowerCase()))
    }
  },
  methods: {
    updateSearchText(e) {
      this.searchText = e
    }
  }
}
</script>
