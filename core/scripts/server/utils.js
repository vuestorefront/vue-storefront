/** Creates a api status call and sends it thru to Express Response object.
 * @param {expressserver.response} res Express HTTP Response
 * @param {number} [code=200] Status code to send on success
 * @param {json} [result='OK'] Text message or result information object
 */
module.exports.apiStatus = (res, result = 'OK', code = 200, meta = null) => {
  let apiResult = { code: code, result: result }
  if (meta !== null) {
    apiResult.meta = meta
  }
  res.status(code).json(apiResult)
  return result
}
