import Icon from './Icon.vue'
import octicons from '@primer/octicons'
import '@primer/octicons/build/build.css'

export default {
  title: 'Design System/Icon',
  component: Icon
}

export const Default = () => ({
  components: { Icon },
  template: `
    <div style="display: flex; flex-wrap: wrap;">
      <div v-for="icon in icons" :key="icon" style="padding: 20px">
        <Icon :name="icon" :title="icon" />
      </div>
    </div>
  `,
  data: () => ({
    icons: Object.keys(octicons)
  })
})

export const Sizes = () => ({
  components: { Icon },
  template: `
    <div>
      <Icon name="ruby" />
      <Icon name="ruby" :width="32" />
      <Icon name="ruby" :width="64" />
    </div>
  `
})

export const InheritColor = () => ({
  components: { Icon },
  template: `
    <div>
      <span style="color: red">
        <Icon name="ruby" />
      </span>
      <span style="color: green">
        <Icon name="ruby" :width="32" />
      </span>
      <span style="color: blue">
        <Icon name="ruby" :width="64" />
      </span>
    </div>
  `
})
