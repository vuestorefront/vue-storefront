export default ranges => [0].concat(ranges).map((from, i, arr) => {
  const to = arr[i + 1]
  return { from, to }
})
