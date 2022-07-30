import Typography from './Typography.vue'

export default {
  title: 'Design System/Typography',
  component: Typography
}

export const Default = () => ({
  components: { Typography },
  template: `
  <div>
    <Typography>text-normal</Typography>
    <Typography italic>text-italic</Typography>
    <Typography bold>text-bold</Typography>
    <Typography uppercase>text-uppercase</Typography>
    <Typography bold uppercase>text-uppercase</Typography>
    <Typography underline>text-underline</Typography>

    <br/><br/>

    <Typography large>text-normal</Typography>
    <Typography large italic>text-italic</Typography>
    <Typography large bold>text-bold</Typography>
    <Typography large uppercase>text-uppercase</Typography>
    <Typography large bold uppercase>text-uppercase</Typography>
    <Typography large underline>text-underline</Typography>

    <br/><br/>

    <Typography as="small">text-normal</Typography><br/>
    <Typography as="small" italic>text-italic</Typography><br/>
    <Typography as="small" bold>text-bold</Typography><br/>
    <Typography as="small" uppercase>text-uppercase</Typography><br/>
    <Typography as="small" bold uppercase>text-uppercase</Typography><br/>
    <Typography as="small" underline>text-underline</Typography><br/>

    <br/><br/>

    <Typography as="h1">Heading 1</Typography>
    <Typography as="h2">Heading 2</Typography>
    <Typography as="h3">Heading 3</Typography>
    <Typography as="h4">Heading 4</Typography>
    <Typography as="h5">Heading 5</Typography>
    <Typography as="h6">Heading 6</Typography>
  </div>
`
})
