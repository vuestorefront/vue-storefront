/* eslint-disable camelcase, @typescript-eslint/camelcase */
import { transformToBlocks } from '@/components/prismic/CustomPage.vue';

describe('[theme/components/prismic] transformToBlocks', () => {
  let supportedBlocks;
  let unsupportedBlocks;

  beforeEach(() => {
    supportedBlocks = {
      header: [
        {
          type: 'heading1',
          text: 'Privacy Policy',
          spans: []
        }
      ],
      content: [
        {
          type: 'paragraph',
          text: 'Some law things here...',
          spans: []
        },
        {
          type: 'paragraph',
          text: 'Content other stuff..',
          spans: []
        }
      ],
      sample_image: {
        dimensions: {
          width: 250,
          height: 250
        },
        alt: 'love crafts',
        copyright: null,
        url: 'https://images.prismic.io/lovecrafts-dev/8763e78f-6e93-4e52-bdcd-9e3915f38655_image+%281%29.png?auto=compress,format&rect=285,0,630,630&w=250&h=250'
      },
      'media-link': {
        link_type: 'Media',
        name: 'star.gif',
        kind: 'image',
        url: 'https://wroomdev.s3.amazonaws.com/tutoblanktemplate%2F97109f41-140e-4dc9-a2c8-96fb10f14051_star.gif?auto=compress,format',
        size: '627291',
        height: '800',
        width: '960'
      },
      'embed-field': {
        version: '1.0',
        url: 'https://divante.com/',
        type: 'link',
        title: 'Divante.com - eCommerce Software House',
        provider_name: 'website',
        thumbnail_url: 'https://divante.com/ogTags/image-thumb__1063__ogImage/ogImage.png',
        html: '<div data-type="website"><a ' +
          'href="https://divante.com/"><h1>Divante.com - ' +
          'eCommerce Software House</h1><img ' +
          'src="https://divante.com/ogTags/image-thumb__1063__ogImage/ogImage.png"><p>We’re ' +
          'experts in providing top-notch eCommerce solutions ' +
          'and products for both B2B and B2C segments. By ' +
          'supporting our clients in sales growth, we define ' +
          'completely novel ideas, implement the latest ' +
          'technologies, and deliver an unprecedented user ' +
          'experience. </p></a></div>',
        embed_url: 'https://divante.com/'
      }
    };
    unsupportedBlocks = {
      geopoint: {
        latitude: 51.114299564839285,
        longitude: 17.041683197021484
      }
    };
  });

  it('should transform primitive values into text objects', () => {
    const primiteValues = {
      price: 123.45,
      'text-field': 'some text here',
      'select-field': 'option1',
      'timestamp-field': '2020-01-13T23:00:00+0000'
    };

    const getParagraphObject = (text) => ([
      {
        spans: [],
        text,
        type: 'paragraph'
      }
    ]);

    const response = transformToBlocks({ data: primiteValues });

    expect(response.length).toEqual(4);

    response.forEach((value) => {
      expect(value.type).toBe('text');
    });

    expect(response[0].document).toStrictEqual(getParagraphObject(123.45));
    expect(response[1].document).toStrictEqual(getParagraphObject('some text here'));
    expect(response[2].document).toStrictEqual(getParagraphObject('option1'));
    expect(response[3].document).toStrictEqual(getParagraphObject('2020-01-13T23:00:00+0000'));
  });

  it('should transform supported blocks correctly', () => {
    const response = transformToBlocks({ data: supportedBlocks });

    expect(response.length).toEqual(5);

    expect(response[0].type).toBe('html');
    expect(response[1].type).toBe('html');
    expect(response[2].type).toBe('image');
    expect(response[3].type).toBe('image');
    expect(response[4].type).toBe('embed');

    expect(response[0].document).toStrictEqual(supportedBlocks.header);
    expect(response[1].document).toStrictEqual(supportedBlocks.content);
    expect(response[2].document).toStrictEqual(supportedBlocks.sample_image);
    expect(response[3].document).toStrictEqual(supportedBlocks['media-link']);
    expect(response[4].document).toStrictEqual(supportedBlocks['embed-field']);
  });

  it('should return undefined for each unsupported blocks', () => {
    const response = transformToBlocks({ data: unsupportedBlocks });

    expect(response).toBeInstanceOf(Array);
    expect(response.length).toEqual(0);
  });
});
