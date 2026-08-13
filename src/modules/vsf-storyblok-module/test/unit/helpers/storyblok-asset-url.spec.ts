import {
  buildStoryblokImageUrl,
  parseStoryblokAssetUrl,
  resolveStoryblokAssetUrl
} from '../../../helpers/storyblok-asset-url';

const CDN_ORIGIN = 'https://sb-assets.budsies.com/';

describe('Storyblok asset URL policy', () => {
  it.each([
    [
      'https://a.storyblok.com/f/109999/500x500/hash/image.png?version=2#preview',
      'https://sb-assets.budsies.com/f/109999/500x500/hash/image.png?version=2#preview'
    ],
    [
      'https://s3.amazonaws.com/a.storyblok.com/f/109999/500x500/hash/image.png',
      'https://sb-assets.budsies.com/f/109999/500x500/hash/image.png'
    ],
    [
      'http://a.storyblok.com/f/109999/500x500/hash/image.png',
      'https://sb-assets.budsies.com/f/109999/500x500/hash/image.png'
    ]
  ])('resolves recognized URL %s', (input, expected) => {
    expect(resolveStoryblokAssetUrl(input, CDN_ORIGIN)).toBe(expected);
  });

  it('keeps an already proxied URL byte-for-byte unchanged', () => {
    const input = 'https://sb-assets.budsies.com/f/1/file.png?x=1#fragment';

    expect(resolveStoryblokAssetUrl(input, CDN_ORIGIN)).toBe(input);
  });

  it.each([
    '',
    '/relative/image.png',
    'data:image/png;base64,abc',
    'blob:https://example.com/id',
    'https://example.com/a.storyblok.com/file.png',
    'https://s3.amazonaws.com/not-a.storyblok.com/file.png',
    'https://a.storyblok.com.evil.example/file.png',
    'not a URL',
    'https://%'
  ])('leaves unsupported input unchanged: %s', (input) => {
    expect(resolveStoryblokAssetUrl(input, CDN_ORIGIN)).toBe(input);
    expect(parseStoryblokAssetUrl(input, CDN_ORIGIN)).toBeUndefined();
  });

  it('normalizes origin and transformation separators', () => {
    expect(buildStoryblokImageUrl(
      'https://a.storyblok.com/f/1/100x50/hash/image.png?version=1#focus',
      '/m/fit-in/200x100/',
      CDN_ORIGIN
    )).toBe(
      'https://sb-assets.budsies.com/f/1/100x50/hash/image.png/m/fit-in/200x100?version=1#focus'
    );
  });

  it('builds transformed URLs without relying on the global URL constructor', () => {
    const globalObject = global as typeof global & { URL?: typeof URL };
    const originalUrl = globalObject.URL;

    try {
      delete globalObject.URL;

      expect(buildStoryblokImageUrl(
        'https://a.storyblok.com/f/109999/698x542/hash/mobile-hero.png',
        '/m/fit-in/700x544',
        CDN_ORIGIN
      )).toBe(
        'https://sb-assets.budsies.com/f/109999/698x542/hash/mobile-hero.png/m/fit-in/700x544'
      );
    } finally {
      globalObject.URL = originalUrl;
    }
  });
});
