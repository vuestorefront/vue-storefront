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

  return await _shopifyCustomClient.graphQLClient.send(pagesQuery);
}

export default fetchAll;
