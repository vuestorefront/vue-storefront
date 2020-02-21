import { prismic } from '../../index';
import { PrismicQuery, PrismicQueryTypes } from '../../types';

const transformQuery = (query: PrismicQuery | PrismicQuery[]): string | string[] => {
  const predict = (method, args) => prismic.Predicates[method](...args);

  const queryContainer = Array.isArray(query) ? query : [query];

  const queries = queryContainer.map((q) => Object.keys(q).map<string>((key) => {
    const current: PrismicQueryTypes = q[key];

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
  }));

  const flatArray = [].concat(...queries.filter((queryElement) => queryElement !== undefined));

  return flatArray.length === 1 ? flatArray[0] : flatArray;
};

export default transformQuery;
