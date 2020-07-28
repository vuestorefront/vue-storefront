import cookieUniversal from 'cookie-universal'

export default ({ req, res }, inject) => {
  const options = {
  "alias": "cookies",
  "parseJSON": true
}
  inject(options.alias, cookieUniversal(req, res, options.parseJSON))
}
