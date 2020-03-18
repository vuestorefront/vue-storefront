import config from 'config'
export default function getFunctionScores () {
  if (!config.elasticsearch.hasOwnProperty('searchScoring')) {
    return false
  }
  let filter = []
  let esScoringAttributes = config.elasticsearch.searchScoring.attributes

  if (!Object.keys(esScoringAttributes).length) {
    return false
  }
  for (const attribute of Object.keys(esScoringAttributes)) {
    for (const scoreValue of Object.keys(esScoringAttributes[attribute].scoreValues)) {
      let data = {
        'filter': {
          'match': {
            [attribute]: scoreValue
          }
        },
        'weight': esScoringAttributes[attribute].scoreValues[scoreValue].weight
      }
      filter.push(data)
    }
  }
  if (filter.length) {
    return { 'functions': filter,
      'score_mode': config.score_mode ? config.score_mode : 'multiply',
      'boost_mode': config.boost_mode ? config.boost_mode : 'multiply',
      'max_boost': config.max_boost ? config.max_boost : 100,
      'min_score': config.function_min_score ? config.function_min_score : 1
    }
  }
  return false
}
