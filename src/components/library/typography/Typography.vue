<script>
import { TypographyElements } from './typography.constants'

export default {
  name: 'Typography',
  props: {
    as: {
      type: String,
      default: 'p',
      validator(value) {
        return TypographyElements.includes(value)
      }
    },
    italic: {
      type: Boolean,
      default: false
    },
    bold: {
      type: Boolean,
      default: false
    },
    uppercase: {
      type: Boolean,
      default: false
    },
    underline: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isItalic() {
      return this.italic ? 'typography--italic' : ''
    },
    isBold() {
      return this.bold ? 'typography--bold' : ''
    },
    isUppercase() {
      return this.uppercase ? 'typography--uppercase' : ''
    },
    isUnderline() {
      return this.underline ? 'typography--underline' : ''
    },
    isLarge() {
      return this.large ? 'typography--large' : ''
    },
    isSmall() {
      return this.small ? 'typography--small' : ''
    }
  },
  render(createElement) {
    return createElement(
      this.as,
      {
        class: `typography typography--${this.as} ${this.isItalic} ${this.isBold} ${this.isUppercase} ${this.isUnderline} ${this.isLarge} ${this.isSmall}`
      },
      this.$slots.default
    )
  }
}
</script>
<style lang="scss" scoped>
.typography {
  font-family: 'Inter', system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: inherit;
  padding: 0;
  margin: 0;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  &--h1,
  &--h2,
  &--h3,
  &--h4,
  &--h5,
  &--h6,
  &--bold {
    font-weight: 600 !important;
  }

  &--h1 {
    font-size: 32px;
    line-height: 48px;
  }
  &--h2 {
    font-size: 24px;
    line-height: 36px;
  }
  &--h3 {
    font-size: 20px;
    line-height: 30px;
  }
  &--h4 {
    font-size: 16px;
    line-height: 24px;
  }
  &--h5 {
    font-size: 14px;
    line-height: 20px;
  }
  &--h6 {
    font-size: 12px;
    line-height: 18px;
  }

  &--p,
  &--span {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }

  &--large {
    font-size: 16px;
  }

  &--small {
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
  }

  &--italic {
    font-style: italic;
  }

  &--uppercase {
    text-transform: uppercase;
  }

  &--underline {
    text-decoration: underline;
  }
}
</style>
