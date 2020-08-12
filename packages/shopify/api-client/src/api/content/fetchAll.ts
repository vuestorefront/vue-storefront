import { _shopifyCustomClient } from '../../index';
import { Content } from '../../types';

/**
 * Fetches all cms pages on the shop.
 * @return {Promise|Content}
 */
async function fetchAll(): Promise<Content[]> {
  const pagesQuery = _shopifyCustomClient.graphQLClient.query((root) => {
    root.addConnection('pages', { args: { first: 10 } }, (page) => {
      page.add('title');
      page.add('body');
      page.add('handle');
    });
  });

  const pages = await _shopifyCustomClient.graphQLClient
    .send(pagesQuery)
    .then(({ data }) => {
      return data;
    });

  return pages;
}

export default fetchAll;
