const shouldPrefetch = (file, type) => {
  if (['script', 'style'].includes(type)) return false
  return true
}

export default shouldPrefetch
