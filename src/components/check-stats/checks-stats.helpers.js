import { formatMilliseconds } from '@/common/format-milliseconds'

export const commonChartOptions = {
  title: {
    text: ''
  },
  credits: {
    enabled: false
  },
  legend: {
    enabled: false
  },
  xAxis: [
    {
      visible: true,
      title: false,
      type: 'datetime',
      maxPadding: 0,
      units: [
        ['hour', [0, 3, 6, 12]],
        ['day', [1]]
      ]
    }
  ],
  tooltip: {
    shared: true,
    useHTML: true,
    backgroundColor: '#fff',
    borderWidth: 0,
    crosshairs: true
  },
  plotOptions: {
    area: {
      lineColor: '#2eb3db',
      lineWidth: 1
    },
    series: {
      states: {
        hover: {
          enabled: false
        }
      }
    }
  }
}

export const responseTimeChartOptions = {
  chart: {
    spacingRight: 60,
    type: 'area',
    backgroundColor: 'transparent',
    height: 180
  },
  yAxis: {
    max: null,
    title: false,
    gridLineWidth: 0,
    labels: {
      formatter: function () {
        return formatMilliseconds(this.value)
      }
    }
  }
}

export const successChartOptions = {
  chart: {
    spacingRight: 0,
    type: 'area',
    backgroundColor: 'transparent',
    height: 180
  },
  yAxis: {
    max: 1,
    title: false,
    gridLineWidth: 0,
    labels: {
      formatter: function () {
        return `${Math.round(this.value * 100)}%`
      }
    }
  }
}

export const createResponseTimeSeries = (stats, statAttr) => {
  const data = stats.map((stat) => {
    return { x: stat.timestamp, y: stat[statAttr] }
  })

  return {
    name: statAttr,
    data,
    tooltip: {
      pointFormatter: function () {
        return `<div class="mt-1">${statAttr.toUpperCase()}: <strong>${formatMilliseconds(this.y)}</strong></div>`
      }
    },
    visible: true,
    marker: {
      enabled: false
    },
    fillColor: 'rgba(69, 200, 241, 0.3)'
  }
}

export const createSuccessSeries = (stats) => {
  const data = stats.map((stat) => {
    return { x: stat.timestamp, y: stat.success }
  })

  return {
    data,
    tooltip: {
      pointFormatter: function () {
        return `<div class="mt-1">Success Ratio: <strong>${Math.round(this.y * 100)}%</strong></div>`
      }
    },
    visible: true,
    marker: {
      enabled: false
    },
    fillColor: 'rgba(69, 200, 241, 0.3)'
  }
}
