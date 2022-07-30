<template>
  <div v-if="stats.length" class="w-100">
    <div class="row mb-0">
      <div class="col">
        <div class="float-right">
          <button
            type="button"
            :class="['btn btn-primary btn-sm text-white mr-1', chartSelected !== 'response_time' && 'opacity-50']"
            @click="select('response_time')"
          >
            <Typography as="span" bold>Response time</Typography>
          </button>
          <button
            type="button"
            :class="['btn btn-primary btn-sm text-white mr-1', chartSelected !== 'success' && 'opacity-50']"
            @click="select('success')"
          >
            <Typography as="span" bold>Success</Typography>
          </button>
        </div>
      </div>
    </div>
    <div v-if="chartSelected === 'response_time'" class="position-relative">
      <div class="position-absolute d-flex flex-column response-time-filters">
        <button
          v-for="item in responseTimeChartFilters"
          :key="item.name"
          type="button"
          :class="['btn btn-primary btn-sm text-white p-1 mb-1', !item.active && 'opacity-50']"
          @click="item.active = !item.active"
        >
          <Typography as="span" uppercase small>{{ item.name }}</Typography>
        </button>
      </div>
    </div>
    <StatsChart ref="statsChart" :options="chartOptions"></StatsChart>
  </div>
  <div v-else class="d-flex justify-content-center pt-2 pb-4">
    <Typography v-if="!loadingChecks" as="h4">No results found</Typography>
  </div>
</template>

<script>
import Typography from '../library/typography'
import { Chart } from 'highcharts-vue'
import {
  commonChartOptions,
  createResponseTimeSeries,
  createSuccessSeries,
  responseTimeChartOptions,
  successChartOptions
} from './checks-stats.helpers'

export default {
  components: {
    StatsChart: Chart,
    Typography
  },
  props: {
    stats: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chartOptions: {},
      chartSelected: 'response_time',
      responseTimeChartFilters: [
        {
          name: 'p99',
          active: true
        },
        {
          name: 'p95',
          active: true
        },
        {
          name: 'avg',
          active: true
        }
      ]
    }
  },
  watch: {
    chartSelected: {
      handler(newVal) {
        if (newVal === 'response_time') {
          if (this.chartOptions.title) {
            this.$refs.statsChart.chart.update(this.createResponseTimeChartOptions())
            this.responseTimeChartFilters.map((item) => {
              item.active = true

              return item
            })
          } else {
            this.chartOptions = this.createResponseTimeChartOptions()
          }
        }
        if (newVal === 'success') {
          if (this.chartOptions.title) {
            this.$refs.statsChart.chart.update(this.createSuccessChartOptions())
          } else {
            this.chartOptions = this.createSuccessChartOptions()
          }
        }
      },
      immediate: true
    },
    responseTimeChartFilters: {
      handler(newVal) {
        const showXAxis = newVal.some((item) => item.active)

        newVal.forEach((item) => {
          this.$refs.statsChart.chart.series
            .find((s) => s.name === item.name)
            .update({
              visible: item.active
            })
        })
        this.$refs.statsChart.chart.xAxis[0].update({ visible: showXAxis })
      },
      deep: true
    }
  },
  methods: {
    select(chartToSelect) {
      this.chartSelected = chartToSelect
    },
    createResponseTimeChartOptions() {
      return {
        ...commonChartOptions,
        ...responseTimeChartOptions,
        ...{
          series: [
            createResponseTimeSeries(this.stats, 'p99'),
            createResponseTimeSeries(this.stats, 'p95'),
            createResponseTimeSeries(this.stats, 'avg')
          ]
        }
      }
    },
    createSuccessChartOptions() {
      return {
        ...commonChartOptions,
        ...successChartOptions,
        ...{
          series: [createSuccessSeries(this.stats), { visible: false }, { visible: false }]
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.response-time-filters {
  top: map-get($spacers, 4);
  right: map-get($spacers, 1);
  z-index: 100;
}

.opacity-50 {
  opacity: 0.5;
}
</style>
