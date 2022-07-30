<template>
  <div>
    <Typography as="h1" class="mb-2">Reporting</Typography>
    <Typography as="p" class="mb-4 pb-2">
      Analyse long term performance of your checks and export aggregated metrics for external reporting duties.
    </Typography>
    <Checks />
  </div>
</template>

<script>
import Checks from '@/components/checks/Checks.vue'
import Typography from '@/components/library/typography'

export default {
  components: {
    Typography,
    Checks
  }
}
</script>
