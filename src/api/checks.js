import { request } from '@/common/request'

export const fetchChecks = () => {
  return request({
    url: 'checks'
  })
}
