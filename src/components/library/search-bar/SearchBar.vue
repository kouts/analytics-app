<template>
  <div class="search-bar-wrapper">
    <Icon name="search" class="search-bar-icon search-bar-icon--search" />
    <input
      ref="inputRef"
      v-model="searchText"
      type="search"
      class="search-bar-input"
      data-search-bar-input="true"
      v-bind="$attrs"
      autocomplete="off"
      :placeholder="$attrs.placeholder || 'Search...'"
      v-on="$listeners"
      @input="input"
      @keydown="inputKeydown"
    />
    <div class="search-bar-icon search-bar-icon--shortcut" title='Press "/" to search'>/</div>
    <div v-show="searchText.length > 0" class="search-bar-icon search-bar-icon--clear" @mousedown="clear">
      <Icon name="x" />
    </div>
  </div>
</template>

<script>
import Icon from '../icon'

/*eslint-disable */
/**
 * The `SearchBar` component displays a search input with some additional features built-in.  
 * 
 * **Features:**  
 * - Includes a default placeholder text - customizable using the `placeholder` attribute.  
 * - The search input **expands** when it gains focus.  
 * - Displays an `x` icon on the right side of the search input, used for **clearing** the text when there's a value typed inside.  
 * - **Focus** on the search input at any time by pressing the `/` key on the keyboard.  
 * - The search text gets cleared by pressing the `esc` key when the search input has focus.
 * 
 * ***Important:*** It is advisable that you include the `SearchBar` component **only once** on each page.  
 * In case multiple `SearchBar` components are present, the first one being displayed will take focus precedence upon `/` keypress.
 */
/* eslint-enable */
export default {
  components: {
    Icon
  },
  inheritAttrs: false,
  emits: ['update'],
  data() {
    return {
      searchText: ''
    }
  },
  created() {
    window.document.addEventListener('keydown', this.documentKeydown)
  },
  beforeDestroy() {
    window.document.removeEventListener('keydown', this.documentKeydown)
  },
  methods: {
    input(e) {
      /**
       * Event that fires when the search text is updated
       */
      this.$emit('update', e.target.value)
    },
    clear() {
      this.searchText = ''
      this.$emit('update', '')
    },
    inputKeydown(e) {
      if (e.key === 'Escape') {
        this.clear()
        this.$refs.inputRef.blur()
      }
    },
    documentKeydown(e) {
      if (
        e.key === '/' &&
        e.target !== this.$refs.inputRef &&
        window.document.activeElement !== this.$refs.inputRef &&
        e.target instanceof HTMLInputElement === false &&
        e.target instanceof HTMLSelectElement === false &&
        e.target instanceof HTMLTextAreaElement === false
      ) {
        e.preventDefault()
        const allVisibleSearchInputs = [].slice.call(document.querySelectorAll('[data-search-bar-input]')).filter((el) => {
          return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length)
        })
        const elToFocus = allVisibleSearchInputs.length > 1 ? allVisibleSearchInputs[0] : this.$refs.inputRef

        elToFocus.focus()
        elToFocus.select()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$input-color: #16212c;
$input-background: #eff2f7;
$icon-color: darken($input-background, 30%);

.search-bar-wrapper {
  display: inline-block;
  position: relative;
}

.search-bar-icon {
  color: $icon-color;
  position: absolute;
  bottom: 0.45rem;
  &--search {
    left: 0.75rem;
  }
  &--shortcut {
    cursor: text;
    display: inline-block;
    right: 0.75rem;
    padding: 1px 5px;
    border: 1px solid lighten($icon-color, 14%);
    background-color: darken($input-background, 3%);
    border-radius: 3px;
    z-index: 50;
    font-family: 'Inter', system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.15rem;
    font-weight: 400;
    font-size: 14px;
  }
  &--clear {
    right: 0.75rem;
    cursor: pointer;
    z-index: 10;
  }
}

.search-bar-input {
  display: block;
  font-family: 'Inter', system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  width: 250px;
  padding: 0.375rem 2rem;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: #16212c;
  background-color: $input-background;
  border: 1px solid $input-background;
  border-radius: 0.35rem;
  transition: border-color 0.15s ease-in-out, width 0.25s;
  &:focus {
    background-color: lighten($input-background, 3%);
    border-color: darken($input-background, 7%);
    outline: 0;
    box-shadow: none;
    width: 300px;
    ~ .search-bar-icon--shortcut {
      display: none;
    }
  }
}

/* Fix the X appearing in search field on Chrome and IE */
input[type='search']::-ms-clear {
  display: none;
  width: 0;
  height: 0;
}
input[type='search']::-ms-reveal {
  display: none;
  width: 0;
  height: 0;
}

input[type='search']::-webkit-search-decoration,
input[type='search']::-webkit-search-cancel-button,
input[type='search']::-webkit-search-results-button,
input[type='search']::-webkit-search-results-decoration {
  display: none;
}
</style>
