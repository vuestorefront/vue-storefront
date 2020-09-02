import { _shopifyCustomClient } from '../../index';
import { Content } from '../../types';

async function fetchByHandle(options): Promise<Content> {
  const pagesQuery = _shopifyCustomClient.graphQLClient.query((root) => {
    root.addConnection(
      'pages',
      { args: { first: 1, query: `'handle: "${options.slug}"'` } },
      (page) => {
        page.add('title');
        page.add('body');
        page.add('handle');
      }
    );
  });

  return await _shopifyCustomClient.graphQLClient.send(pagesQuery);;
}

export default fetchByHandle;
