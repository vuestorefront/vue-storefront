import { prismic } from '../../index';
import { PrismicQuery, PrismicQueryTypes } from '../../types';

// TODO: UNIT TEST
const transformQuery = (query: PrismicQuery): string | string[] => {
  const predict = (method, args) => prismic.Predicates[method](...args);

  const queries = Object.keys(query).map<string>((key) => {
    const current: PrismicQueryTypes = query[key];

    if (!prismic.Predicates[key]) {
      return undefined;
    }

    const { fragment, after, before, day, documentId,
      hour, latitude, longitude, maxResults, month,
      radius, value, values, year
    } = current;

    switch (true) {
      case values !== undefined:
        return predict(key, [fragment, values]);
      case value !== undefined:
        return predict(key, [fragment, value]);
      case documentId !== undefined && maxResults !== undefined:
        return predict(key, [documentId, maxResults]);
      case before !== undefined && after !== undefined:
        return predict(key, [fragment, before, after]);
      case before !== undefined:
        return predict(key, [fragment, before]);
      case after !== undefined:
        return predict(key, [fragment, after]);
      case latitude !== undefined && longitude !== undefined && radius !== undefined:
        return predict(key, [fragment, latitude, longitude, radius]);
      case year !== undefined:
        return predict(key, [fragment, year]);
      case month !== undefined:
        return predict(key, [fragment, month]);
      case day !== undefined:
        return predict(key, [fragment, day]);
      case hour !== undefined:
        return predict(key, [fragment, hour]);
      default:
        return predict(key, [fragment]);
    }
  });

  return queries.length === 1
    ? queries[0]
    : queries.filter((queryElement) => queryElement !== undefined);
};

export default transformQuery;
