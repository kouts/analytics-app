<template>
  <div class="text-center">
    <Typography as="h1" class="mb-2">Page not found</Typography>
    <Typography as="p"> Oops we couldn't find that page. Try going back <router-link to="/">home</router-link> </Typography>
  </div>
</template>

<script>
import Typography from '@/components/library/typography'

export default {
  components: {
    Typography
  }
}
</script>
