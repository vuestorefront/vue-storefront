import Redis from 'redis-tag-cache';

const defaultRedisOptions = {
  maxRetriesPerRequest: 3
};

export default function RedisCache (opt) {
  const options = {
    ...opt,
    redis: {
      ...opt?.redis,
      ...defaultRedisOptions
    }
  };
  const client = new Redis(options);

  return {
    async invoke({ route, render, getTags }) {
      let key = `page:${ route }`;
      let shouldCache = true;
      
      if (
        options.queryParamFilter?.denyList &&
        options.queryParamFilter?.allowList
      ) {
        /*
        allowList and denyList contain query params that could affect the content of the page.
        Any other params that don't exist in deny/allowList can be stripped as they do not affect the content of the page (e.g. gclid).

        Examples:
        sale/april-catalogue/up-to-50-off?sc_src=email_3757321&sc_lid=272735070&sc_uid=zNKj3A7HFD - Cache but strip all except allowList
        term=white+shirt&sort=price_ascending&page=2                                              - Only allowListed params - cache and keep allowList
        search?term=dress&sort=price_ascending&page=1&itemsPerPage=100                            - Do not cache, denyList item exists
        */
        const cleanParams = [];
        const urlParts = route.split("?");
        if (urlParts.length == 2) {
          const params = urlParts[1].split("&");

          for (const param of params) {
            const paramKey = param.split("=")[0];
            if (
              // Do not cache: denyListed param exists (stop processing further params)
              options.queryParamFilter.denyList.includes(paramKey)
            ) {
              shouldCache = false;
              break;
            }
            // add any allowList params to cleanParams, ignore any other params
            if (options.queryParamFilter.allowList.includes(paramKey)) {
              cleanParams.push(param);
            }
          }
        }

        key = `page:${urlParts[0]}${
          cleanParams.length ? "?" : ""
        }${cleanParams.join("&")}`;

        // console.log(`Original route: ${route}\nkey ${shouldCache ? "is" : "is not"} cacheable`);

      }

      if (shouldCache) {
        const cachedResponse = await client.get(key);

        if (cachedResponse) {
          return cachedResponse;
        }
      }

      const content = await render();
      const tags = getTags();

      if (!tags.length) {
        return content;
      }

      // We could add "await" here, but saving content in cache doesn't have to block the request
      if (shouldCache) {
        client.set(
          key,
          content,
          tags
        );
      }
      return content;
    },

    invalidate({ tags }) {
      const clearAll = tags.includes('*');

      if (!clearAll) {
        return client.invalidate(...tags)
      }

      return new Promise((resolve, reject) => {
        const prefix = `${options.redis.keyPrefix || ''}tags:`;
        const stream = client.redis.scanStream({ match: `${prefix}*` });

        const tags = [];

        stream.on('data', rawTags => tags.push(...rawTags.map(tag => tag.replace(prefix, ''))));
        stream.on('end', async () => {
          if (tags.length) {
            await client.invalidate(...tags);
          }
          resolve();
        });
        stream.on('error', reject);
      });
    }
  };
};
