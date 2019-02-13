/** Creates a API status call and sends it through to Express SearchResponse object.
 * @param {expressserver.response} res Express HTTP SearchResponse
 * @param {number} [code=200] Status code to send on success
 * @param {json} [result='OK'] Text message or result information object
 */
module.exports = (res, result = 'OK', code = 200, meta = null) => {
  let apiResult = { code: code, result: result }
  if (meta !== null) {
    apiResult.meta = meta
  }
  res.status(code).json(apiResult)
  return result
}
