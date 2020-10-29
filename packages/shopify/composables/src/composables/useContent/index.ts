import { getContent } from '@vue-storefront/shopify-api';
import { Content } from '@vue-storefront/shopify-api/src/types';

interface UseContent<CONTENT, CONTENT_PARAMS> {
  pages: () => Promise<CONTENT[]>;
  loadPage: (handle: string) => Promise<CONTENT>;
}

const params: UseContent<Content, any> = {
  pages: async () => {
    return await getContent.fetchAll();
  },

  loadPage: async (handle) => {
    return await getContent.fetchByHandle({ slug: handle });
  }
};

const useContent: () => UseContent<Content, any> = () => params;

export default useContent;
