import { mount, Wrapper } from '@vue/test-utils';
import Vue from 'vue';

import BaseImage from '../../../components/BaseImage.vue';

jest.mock('uuid', () => ({
  v1: () => 'base-image-test-id'
}));

jest.mock('src/modules/shared', () => ({
  MimeTypeValue: {
    IMAGE_AVIF: 'image/avif',
    IMAGE_WEBP: 'image/webp'
  }
}));

describe('budsies BaseImage', () => {
  let wrapper: Wrapper<Vue> | undefined;

  afterEach(() => {
    wrapper?.destroy();
    wrapper = undefined;
  });

  it('renders an image without a source set', () => {
    wrapper = mount(BaseImage as any, {
      propsData: {
        src: '/logo.svg'
      }
    });

    const image = wrapper.find('picture img');

    expect(image.attributes('src')).toBe('/logo.svg');
    expect(image.attributes('srcset')).toBeUndefined();
  });

  it('serializes the default source set for the image attribute', () => {
    wrapper = mount(BaseImage as any, {
      propsData: {
        fallbackSrcset: {
          breakpoint: 1200,
          aspectRatio: 2,
          srcset: ['/logo.png 1x', '/logo@2x.png 2x']
        }
      }
    });

    expect(wrapper.find('picture img').attributes('srcset')).toBe(
      '/logo.png 1x, /logo@2x.png 2x'
    );
  });
});
