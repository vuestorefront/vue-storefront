import config from 'config'

function getConfig (queryText) {
  let scoringConfig = config.elasticsearch.hasOwnProperty('searchScoring') ? config.elasticsearch.searchScoring : {}
  let minimumShouldMatch = scoringConfig.hasOwnProperty('minimum_should_match') ? scoringConfig.minimum_should_match : '75%'
  if (config.elasticsearch.queryMethod === 'GET') {
    // minimum_should_match param must be have a "%" suffix, which is an illegal char while sending over query string
    minimumShouldMatch = encodeURIComponent(minimumShouldMatch)
  }
  // Create config for multi match query
  let multiMatchConfig = {
    'query': queryText,
    'operator': scoringConfig.operator ? scoringConfig.operator : 'or',
    'fuzziness': scoringConfig.fuzziness ? scoringConfig.fuzziness : '2',
    'cutoff_frequency': scoringConfig.cutoff_frequency ? scoringConfig.cutoff_frequency : '0.01',
    'max_expansions': scoringConfig.max_expansions ? scoringConfig.max_expansions : '3',
    'prefix_length': scoringConfig.prefix_length ? scoringConfig.prefix_length : '1',
    'minimum_should_match': minimumShouldMatch,
    'tie_breaker': scoringConfig.tie_breaker ? scoringConfig.tie_breaker : '1'
  }
  if (scoringConfig.hasOwnProperty('analyzer')) {
    multiMatchConfig['analyzer'] = scoringConfig.analyzer
  }
  return multiMatchConfig
}

export default function getMultiMatchConfig (queryText) {
  return getConfig(queryText)
}
