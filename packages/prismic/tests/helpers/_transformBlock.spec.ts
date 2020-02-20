/* eslint-disable camelcase, @typescript-eslint/camelcase */
import { transformBlock } from '../../src/helpers/_utils';

describe('[prismic] transformBlock', () => {
  let block;

  beforeEach(() => {
    block = undefined;
  });

  it('should return text type if string', () => {
    block = transformBlock('lorem ipsum');

    expect(typeof block).toBe('string');
    expect(block).toBe('lorem ipsum');
  });
  it('should return text type if number', () => {
    block = transformBlock(123);

    expect(typeof block).toBe('string');
    expect(block).toBe('123');
  });
  it('should return html type if array', () => {
    block = transformBlock([
      {
        type: 'paragraph',
        text: 'lorem ipsum',
        spans: []
      }
    ]);

    expect(block).toBe('<p>lorem ipsum</p>');
  });
  it('should return correct html tag', () => {
    block = transformBlock([
      {
        type: 'heading1',
        text: 'lorem ipsum',
        spans: []
      }
    ]);

    expect(block).toBe('<h1>lorem ipsum</h1>');
  });
  it('should return default paragraph when missing required fields', () => {
    const block1 = transformBlock([
      {
        type: 'paragraph',
        text: 'lorem ipsum'
        // missing spans
      }
    ]);
    const block2 = transformBlock([
      {
        type: 'paragraph',
        // missing text
        spans: []
      }
    ]);
    const block3 = transformBlock([
      {
        // missing type
        text: 'lorem ipsum',
        spans: []
      }
    ]);

    expect(block1).toBe('<p>lorem ipsum</p>');
    expect(block2).toBe('<p></p>');
    expect(block3).toBe('<p>lorem ipsum</p>');
  });
  it('should return image type if has dimensions and url', () => {
    block = transformBlock({
      dimensions: {
        width: 12,
        height: 12
      },
      url: 'http://localhost'
    });

    expect(block).toBe('<img src="http://localhost" height="" width="" alt="" />');
  });
  it('should render all values for image type when provided', () => {
    block = transformBlock({
      dimensions: {
        width: 12,
        height: 12
      },
      url: 'http://localhost',
      width: 12,
      height: 12,
      alt: 'sample image',
      name: 'image name'
    });

    expect(block).toBe('<img src="http://localhost" height="12" width="12" alt="sample image" />');
  });
  it('should return embed type if embed url', () => {
    const block1 = transformBlock({
      embed_url: 'http://localhost',
      html: '<body><p>lorem ipsum</p></body>'
    });
    const block2 = transformBlock({
      embed_url: 'http://localhost'
    });

    expect(block1).toBe('<body><p>lorem ipsum</p></body>');
    expect(block2).toBe('');
  });
  it('should return link type', () => {
    const block1 = transformBlock({
      link_type: 'Image',
      kind: 'image',
      url: 'http://localhost'
    });
    const block2 = transformBlock({
      link_type: 'Document',
      kind: 'link',
      url: 'http://localhost'
    });
    const block3 = transformBlock({
      link_type: 'not-supported',
      kind: 'link',
      url: 'http://localhost'
    });

    expect(block1).toBe('<img src="http://localhost" height="" width="" alt="" />');
    expect(block2).toBe('<a href="http://localhost">http://localhost</a>');
    expect(block3).toBe('http://localhost');
  });
  it('should return empty string if unknown type', () => {
    block = transformBlock({
      unknown: 'type'
    });

    expect(typeof block).toBe('string');
    expect(block).toBe('');
  });
});
