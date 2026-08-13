import getRichTextItemData from '../../../helpers/get-rich-text-item-data.function';
import getUrlFromLink from '../../../helpers/get-url-from-link';

jest.mock('uuid', () => ({ v4: () => 'test-id' }));
jest.mock('../../../components/index', () => ({ components: { block: 'storyblok-block' } }));
jest.mock('../../../components/global/rich-text/components/TextComponent.vue', () => ({
  name: 'StoryblokRichTextTextComponent'
}));

jest.mock('config', () => ({
  storyblok: {
    assetCdnOrigin: 'https://sb-assets.budsies.com',
    settings: { appendStoreCodeFromHeader: false }
  }
}));

const origin = 'https://a.storyblok.com/f/1/10x10/hash/file.png';
const cdn = 'https://sb-assets.budsies.com/f/1/10x10/hash/file.png';

describe('Storyblok module asset sinks', () => {
  it('normalizes rich-text images before generic rendering', () => {
    const item = getRichTextItemData({
      type: 'image',
      attrs: { src: origin, alt: 'Example' }
    });

    expect(item.rootElementAttributes).toEqual({ src: cdn, alt: 'Example' });
  });

  it('normalizes a rich-text asset link before external-link routing', () => {
    expect(getUrlFromLink({
      url: origin,
      cached_url: origin,
      linktype: 'asset'
    } as any, 'www.budsies.com')).toBe(cdn);
  });

  it('leaves unrelated links unchanged', () => {
    expect(getUrlFromLink({
      url: 'https://example.com/file.png',
      cached_url: 'https://example.com/file.png',
      linktype: 'url'
    } as any, 'www.budsies.com')).toBe('https://example.com/file.png');
  });
});
