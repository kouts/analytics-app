export const formatMilliseconds = (ms) => {
  const seconds = (ms / 1000).toFixed(2)
  const minutes = (ms / (1000 * 60)).toFixed(1)

  if (!ms) return '0'
  if (ms < 1000) return ms.toFixed(0) + 'ms'
  if (seconds < 60) return seconds + 'sec'
  else if (minutes < 60) return minutes + 'min'
}
