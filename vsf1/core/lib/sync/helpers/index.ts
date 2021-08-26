export const hasResponseError = (jsonResponse): boolean => {
  if (typeof jsonResponse.result === 'string') {
    return true
  }

  const hasMessage = jsonResponse.result.result || jsonResponse.result.message

  return Boolean(hasMessage) && jsonResponse.result.code !== 'ENOTFOUND'
}

export const getResponseMessage = (jsonResponse): string => {
  if (typeof jsonResponse.result === 'string') {
    return jsonResponse.result
  }

  if (typeof jsonResponse.result.result === 'string') {
    return jsonResponse.result.result
  }

  return jsonResponse.result.message
}
