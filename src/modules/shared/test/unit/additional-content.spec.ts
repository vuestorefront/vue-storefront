/* eslint-disable vue/one-component-per-file */
import Vue, { ComputedRef, defineComponent } from 'vue';
import { createRenderer } from 'vue-server-renderer';

import {
  AdditionalContentEntry,
  AdditionalContentOutlet,
  AdditionalContentRegistry,
  additionalContentInjectionKey,
  useAdditionalContent
} from '@vue-storefront/core/additional-content';

import { mount } from '@vue/test-utils';

const FirstComponent = defineComponent({
  name: 'FirstAdditionalContent',
  render: createElement => createElement(
    'span',
    { attrs: { 'data-content': 'first' } },
    'first'
  )
});
const SecondComponent = defineComponent({
  name: 'SecondAdditionalContent',
  render: createElement => createElement(
    'span',
    { attrs: { 'data-content': 'second' } },
    'second'
  )
});

function entry (
  key: AdditionalContentEntry['key'],
  component = FirstComponent
): AdditionalContentEntry {
  return { key, component };
}

function createOutletApp (registry: AdditionalContentRegistry): Vue {
  const Consumer = defineComponent({
    name: 'AdditionalContentSsrFixture',
    setup () {
      const outlet = useAdditionalContent(
        AdditionalContentOutlet.FOOTER_LINKS
      );

      return {
        outlet: outlet as unknown as readonly AdditionalContentEntry[]
      };
    },
    render (createElement) {
      return createElement(
        'div',
        this.outlet.map(content => createElement(
          content.component,
          { key: content.key }
        ))
      );
    }
  });

  return new Vue({
    provide: {
      [additionalContentInjectionKey as symbol]: registry
    },
    render: createElement => createElement(Consumer)
  });
}

describe('AdditionalContentRegistry', () => {
  it('starts empty and rejects missing providers descriptively', () => {
    const registry = new AdditionalContentRegistry();
    expect(
      registry.get(AdditionalContentOutlet.FOOTER_LINKS).value
    ).toEqual([]);
    const consoleError = jest.spyOn(console, 'error').mockImplementation();

    try {
      expect(() => useAdditionalContent(
        AdditionalContentOutlet.FOOTER_LINKS
      )).toThrow(
        'Missing application service provider: additional content.'
      );
    } finally {
      consoleError.mockRestore();
    }
  });

  it('appends multiple contributors deterministically', () => {
    const registry = new AdditionalContentRegistry();
    registry.register(
      AdditionalContentOutlet.FOOTER_LINKS,
      entry('first-module:first')
    );
    registry.register(AdditionalContentOutlet.FOOTER_LINKS, [
      entry('second-module:first', SecondComponent),
      entry('second-module:second', SecondComponent)
    ]);

    expect(registry.get(AdditionalContentOutlet.FOOTER_LINKS).value.map(
      registeredEntry => registeredEntry.key
    )).toEqual([
      'first-module:first',
      'second-module:first',
      'second-module:second'
    ]);
  });

  it('rejects duplicate and non-namespaced keys descriptively', () => {
    const registry = new AdditionalContentRegistry();
    registry.register(
      AdditionalContentOutlet.PRIVACY_POLICY_LINKS,
      entry('first-module:privacy')
    );

    expect(() => registry.register(
      AdditionalContentOutlet.PRIVACY_POLICY_LINKS,
      entry('first-module:privacy')
    )).toThrow(
      'Duplicate Additional Content key "first-module:privacy" in outlet "privacy-policy-links".'
    );
    expect(() => registry.register(
      AdditionalContentOutlet.PRIVACY_POLICY_LINKS,
      entry('invalid' as AdditionalContentEntry['key'])
    )).toThrow('Additional Content key "invalid" must be namespaced.');
  });

  it('exposes a readonly reactive list and observes late registration', async () => {
    const registry = new AdditionalContentRegistry();
    let outlet: ComputedRef<readonly AdditionalContentEntry[]> | undefined;
    const Fixture = defineComponent({
      name: 'AdditionalContentConsumerFixture',
      template: `
        <div>
          <component
            v-for="content in outlet"
            :is="content.component"
            :key="content.key"
          />
        </div>
      `,
      setup () {
        outlet = useAdditionalContent(
          AdditionalContentOutlet.FOOTER_LINKS
        );
        return { outlet };
      }
    });
    const wrapper = mount(Fixture as any, {
      provide: {
        [additionalContentInjectionKey as symbol]: registry
      }
    });
    expect(wrapper.text()).toBe('');

    registry.register(
      AdditionalContentOutlet.FOOTER_LINKS,
      entry('late-module:first')
    );
    await Vue.nextTick();
    expect(wrapper.text()).toBe('first');

    expect(() => {
      (outlet?.value as AdditionalContentEntry[]).push(
        entry('consumer:mutation', SecondComponent)
      );
    }).toThrow();
    await Vue.nextTick();
    expect(wrapper.text()).toBe('first');
    expect(outlet?.value).toHaveLength(1);
    wrapper.destroy();
  });

  it('renders deterministic SSR output and isolates application registries', async () => {
    const firstRegistry = new AdditionalContentRegistry();
    firstRegistry.register(AdditionalContentOutlet.FOOTER_LINKS, [
      entry('first-module:first'),
      entry('second-module:second', SecondComponent)
    ]);
    const secondRegistry = new AdditionalContentRegistry();
    secondRegistry.register(
      AdditionalContentOutlet.FOOTER_LINKS,
      entry('second-app:second', SecondComponent)
    );
    const disabledRegistry = new AdditionalContentRegistry();
    const renderer = createRenderer();

    const [firstHtml, secondHtml, disabledHtml] = await Promise.all([
      renderer.renderToString(createOutletApp(firstRegistry)),
      renderer.renderToString(createOutletApp(secondRegistry)),
      renderer.renderToString(createOutletApp(disabledRegistry))
    ]);

    expect(firstHtml.indexOf('data-content="first"')).toBeLessThan(
      firstHtml.indexOf('data-content="second"')
    );
    expect(secondHtml).toContain('data-content="second"');
    expect(secondHtml).not.toContain('data-content="first"');
    expect(disabledHtml).not.toContain('data-content=');
  });

  it('hydrates equivalent output and stays reactive after hydration', async () => {
    const registry = new AdditionalContentRegistry();
    registry.register(
      AdditionalContentOutlet.FOOTER_LINKS,
      entry('server-client:first')
    );
    const renderer = createRenderer();
    const serverHtml = await renderer.renderToString(createOutletApp(registry));
    const host = document.createElement('div');
    host.innerHTML = serverHtml;
    document.body.appendChild(host);
    const consoleError = jest.spyOn(console, 'error').mockImplementation();
    const clientApp = createOutletApp(registry);

    try {
      clientApp.$mount(host.firstElementChild as Element, true);
      expect(consoleError.mock.calls.flat().join(' ')).not.toContain(
        'hydration'
      );
      expect(clientApp.$el.textContent).toBe('first');

      registry.register(
        AdditionalContentOutlet.FOOTER_LINKS,
        entry('late-client:second', SecondComponent)
      );
      await Vue.nextTick();
      expect(clientApp.$el.textContent).toBe('firstsecond');
    } finally {
      clientApp.$destroy();
      consoleError.mockRestore();
      host.remove();
    }
  });
});
