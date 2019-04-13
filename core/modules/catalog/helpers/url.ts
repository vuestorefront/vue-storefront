export function buildFilterQueryString ({ route, filters }) {
  let queryString = {}
  for (let prop in filters.chosen) {
    if (prop === 'price') {
        let range = filters.chosen[prop].id[0].split('-')
        queryString[prop] = range[0] + '-' + range[1]
    } else {
        queryString[prop] = filters.chosen[prop].id.join(',')
    }
  }
  let currentQuery:any = {}
  if (route.query.page) {
    currentQuery.page = route.query.page
  }
  if (route.query.dir) {
    currentQuery.dir = route.query.dir
  }
  if (route.query.order) {
    currentQuery.order = route.query.order
  }
  if (route.query.referral) {
    currentQuery.referral = route.query.referral
  }
  let query = Object.assign({}, currentQuery, queryString)
  if (parseInt(query['page']) <= 0) delete query['page']
  return query
}
