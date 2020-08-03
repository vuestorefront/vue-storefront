const config = {
  publicKey: null,
  ckoWebHookUrl: 'https://play-commercetools.cko-playground.ckotech.co/api',
  frames: {
    styles: {},
    tokenizedCardKey: 'temporary-tokenized-card',
    localization: null
  }
};

interface Configuration {
  publicKey: string;
  ckoWebHookUrl?: string;
  frames?: {
    styles?: any;
    tokenizedCardKey?: string;
    localization?: string | CustomLocalization;
  };
}

interface CustomLocalization {
  cardNumberPlaceholder: string;
  expiryMonthPlaceholder: string;
  expiryYearPlaceholder: string;
  cvvPlaceholder: string;
}

const defaultStyles = {
  'card-number': {
    color: 'red'
  },
  base: {
    color: '#72757e',
    fontSize: '19px',
    minWidth: '60px'
  },
  invalid: {
    color: 'red'
  },
  placeholder: {
    base: {
      color: 'black',
      fontSize: '19px'
    }
  }
};

const setup = (params: Configuration) => {
  config.publicKey = params.publicKey;
  config.ckoWebHookUrl = params.ckoWebHookUrl || config.ckoWebHookUrl;
  config.frames.styles = params.frames?.styles || defaultStyles;
  config.frames.tokenizedCardKey = params.frames?.tokenizedCardKey || config.frames.tokenizedCardKey;
  config.frames.localization = params.frames?.localization || null;
};

const getPublicKey = () => config.publicKey;
const getCkoWebhookUrl = () => config.ckoWebHookUrl;
const getFramesStyles = () => config.frames.styles;
const getFramesCardTokenKey = () => config.frames.tokenizedCardKey;
const getFramesLocalization = () => config.frames.localization;

export { setup, getPublicKey, getCkoWebhookUrl, getFramesStyles, getFramesCardTokenKey, getFramesLocalization, Configuration };
