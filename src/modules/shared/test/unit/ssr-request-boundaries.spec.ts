import Vue, {
  defineComponent,
  onServerPrefetch,
  ref
} from 'vue';
import { createRenderer } from 'vue-server-renderer';
import { extendHeadFactory } from '@vue-storefront/core/helpers/extended-head.factory';
import {
  createRequestServices,
  requestServicesInjectionKey,
  useRequestServices
} from '@vue-storefront/core/request-services';

import { getCanonicalUrl } from '../../helpers/get-canonical-url.function';

interface RequestFixture {
  host: string,
  forwardedHost?: string,
  userAgent: string,
  cookie: string
}

describe('SSR request boundary compatibility', () => {
  it('keeps request metadata, canonical URLs, redirects, and head extensions isolated', async () => {
    const renderer = createRenderer();
    const documentDescriptor = Object.getOwnPropertyDescriptor(global, 'document');
    delete (global as any).document;

    async function renderForRequest (requestFixture: RequestFixture) {
      const redirect = jest.fn();
      const extendedHead = extendHeadFactory();
      const headers = {
        host: requestFixture.host,
        ...(requestFixture.forwardedHost
          ? { 'x-forwarded-host': requestFixture.forwardedHost }
          : {}),
        'user-agent': requestFixture.userAgent,
        cookie: requestFixture.cookie
      };
      const context = {
        server: {
          request: { headers },
          response: { redirect }
        },
        output: {
          cacheTags: new Set(),
          redirect: null
        }
      };
      const requestServices = createRequestServices(context as any);
      const router = {
        currentRoute: {
          name: 'request-fixture',
          path: '/request-fixture'
        },
        resolve: () => ({ href: '/canonical-request-fixture' })
      };
      const Fixture = defineComponent({
        name: 'SsrRequestBoundaryFixture',
        template: '<div>{{ requestSummary }}</div>',
        setup () {
          const request = useRequestServices();
          const requestSummary = ref('pending');

          onServerPrefetch(async () => {
            const cookie = request.getCookie('test-group');
            const canonicalUrl = getCanonicalUrl(request.host, router as any);
            extendedHead.append(`head:${request.host}`);
            request.redirect?.(`/redirect/${request.host}`);
            requestSummary.value = [
              request.host,
              request.userAgent,
              cookie,
              canonicalUrl
            ].join('|');
          });

          return { requestSummary };
        }
      });
      const app = new Vue({
        provide: {
          [requestServicesInjectionKey as symbol]: requestServices
        },
        render: createElement => createElement(Fixture as any)
      });
      const html = await renderer.renderToString(app, context);

      return {
        extendedHead: extendedHead.inject(),
        html,
        redirect
      };
    }

    try {
      const [first, second] = await Promise.all([
        renderForRequest({
          host: 'first-origin.test',
          forwardedHost: 'first-forwarded.test',
          userAgent: 'First Agent',
          cookie: 'test-group=first; other=value'
        }),
        renderForRequest({
          host: 'second.test',
          userAgent: 'Second Agent',
          cookie: 'test-group=second'
        })
      ]);

      expect(first.html).toContain(
        'first-forwarded.test|First Agent|first|https://first-forwarded.test/canonical-request-fixture'
      );
      expect(first.html).not.toContain('second.test');
      expect(first.redirect).toHaveBeenCalledWith(
        302,
        '/redirect/first-forwarded.test'
      );
      expect(first.extendedHead).toBe('head:first-forwarded.test');

      expect(second.html).toContain(
        'second.test|Second Agent|second|https://second.test/canonical-request-fixture'
      );
      expect(second.html).not.toContain('first-forwarded.test');
      expect(second.redirect).toHaveBeenCalledWith(302, '/redirect/second.test');
      expect(second.extendedHead).toBe('head:second.test');
    } finally {
      if (documentDescriptor) {
        Object.defineProperty(global, 'document', documentDescriptor);
      }
    }
  });
});
