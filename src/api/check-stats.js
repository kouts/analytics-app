import { request } from '@/common/request'

export const fetchCheckStats = (checkId, fromTimestamp, toTimestamp) => {
  const dateRangeParams =
    fromTimestamp && toTimestamp
      ? {
          timestamp_gte: fromTimestamp,
          timestamp_lte: toTimestamp
        }
      : {}

  return request({
    url: 'check_stats',
    params: { ...{ checkId }, ...dateRangeParams }
  })
}
