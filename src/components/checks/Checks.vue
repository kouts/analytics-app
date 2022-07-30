<template>
  <table class="table table-checks">
    <thead>
      <tr>
        <th scope="col" class="w-15">TYPE</th>
        <th scope="col" class="w-45">NAME</th>
        <th scope="col" class="w-10 text-center">SUCCESS</th>
        <th scope="col" class="w-10 text-center">AVG</th>
        <th scope="col" class="w-10 text-center">P95</th>
        <th scope="col" class="w-10 text-center">P99</th>
      </tr>
    </thead>
    <tbody v-if="checks.length">
      <template v-for="check in checks">
        <tr :key="check.id">
          <td colspan="6" class="w-100 p-0">
            <table class="table table-borderless mb-0">
              <tr>
                <td class="w-15">
                  <button
                    type="button"
                    class="d-flex align-items-center btn-transparent ml-n2"
                    @click="toggleDetails(check.id, check.expanded)"
                  >
                    <Icon :name="check.expanded ? 'chevron-down' : 'chevron-right'" class="toggle-icon" :width="20" />
                    <span :class="['badge badge-check', CheckTypes[check.type].cssClass]">{{ check.type }}</span>
                    <LoadingSpinner class="ml-1" :size="16" :width="2" :show="loadingStats.includes(check.id)" />
                  </button>
                </td>
                <td class="w-45">{{ check.name }}</td>
                <td class="w-10 text-center">{{ Math.round(check.success * 100) }}%</td>
                <td class="w-10 text-center">{{ formatMilliseconds(check.avg) }}</td>
                <td class="w-10 text-center">{{ formatMilliseconds(check.p95) }}</td>
                <td class="w-10 text-center">{{ formatMilliseconds(check.p99) }}</td>
              </tr>
              <tr v-if="check.expanded" :key="`detail-${check.id}`" class="expanded">
                <td colspan="6" class="w-100 pt-0">
                  <CheckStats :stats="stats[check.id]" />
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </template>
    </tbody>
    <tbody v-else>
      <tr class="no-hover">
        <td colspan="6">
          <div class="d-flex justify-content-center py-4">
            <LoadingSpinner :show="loadingChecks" />
            <Typography v-if="!loadingChecks" as="h3">No results found</Typography>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import CheckStats from '@/components/check-stats/CheckStats.vue'
import Icon from '@/components/library/icon/Icon'
import LoadingSpinner from '../library/loading-spinner'
import Typography from '../library/typography'
import { CheckTypes } from './checks.constants'
import { fetchCheckStats } from '@/api/check-stats'
import { fetchChecks } from '@/api/checks'
import { formatMilliseconds } from '@/common/format-milliseconds'
import { getLastWeekRange } from '@/common/get-last-week-range'

export default {
  components: {
    Icon,
    CheckStats,
    LoadingSpinner,
    Typography
  },
  data() {
    return {
      checks: [],
      CheckTypes,
      stats: {},
      loadingChecks: false,
      loadingStats: []
    }
  },
  async created() {
    let res = []

    this.loadingChecks = true

    try {
      res = await fetchChecks()
    } catch (error) {
      console.error('Failed to fetch checks')
    }
    res.map((check) => {
      check.expanded = false

      return check
    })
    this.checks = res
    this.loadingChecks = false
  },
  methods: {
    async toggleDetails(checkId, expanded) {
      if (this.loadingStats.includes(checkId)) return

      if (!expanded) {
        // Set the reference date to 24/07/2022
        const referenceDate = new Date(2022, 6, 24)
        const { first, last } = getLastWeekRange(referenceDate)
        const index = this.loadingStats.findIndex((i) => i === checkId)

        try {
          this.loadingStats.push(checkId)
          this.stats[checkId] = await fetchCheckStats(checkId, first, last)
        } catch (error) {
          console.error(`Failed to fetch stats for checkId ${checkId}`)
        }
        this.loadingStats.splice(index, 1)
      }
      const check = this.checks.find((check) => check.id === checkId)

      check.expanded = !check.expanded
    },
    formatMilliseconds
  }
}
</script>

<style lang="scss" scoped>
.w-10 {
  width: 10%;
}

.w-15 {
  width: 15%;
}

.w-45 {
  width: 45%;
}

.toggle-icon {
  color: $gray-500;
}

.table tr.expanded td {
  border-top: 1px solid transparent;
}

.btn-transparent {
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
}

.badge-check {
  font-size: 0.8rem;
  font-weight: normal;
  color: $white;
  margin-left: map-get($spacers, 1);
  &--api {
    background-color: #353b3a;
  }
  &--browser {
    background-color: #5e6766;
  }
}

.table-checks tbody > tr:not(.no-hover):hover {
  background-color: $gray-100;
}
</style>
