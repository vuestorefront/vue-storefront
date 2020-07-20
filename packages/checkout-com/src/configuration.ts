const config = {
  publicKey: null,
  ckoWebHookUrl: 'https://play-commercetools.cko-playground.ckotech.co/api',
  tokenizedCardKey: 'temporary-tokenized-card',
  frames: {
    styles: {},
    localization: null
  }
};

interface Configuration {
  publicKey: string;
  ckoWebHookUrl?: string;
  tokenizedCardKey?: string;
  frames?: {
    styles?: any;
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
  config.frames.localization = params.frames?.localization || null;
  config.tokenizedCardKey = params.tokenizedCardKey || config.tokenizedCardKey;
};

const getPublicKey = () => config.publicKey;
const getCkoWebhookUrl = () => config.ckoWebHookUrl;
const getCkoProxyUrl = () => `${window.location.origin}/cko-api`;
const getFramesStyles = () => config.frames.styles;
const getFramesLocalization = () => config.frames.localization;
const getTransactionTokenKey = () => config.tokenizedCardKey;

export { setup, getPublicKey, getCkoWebhookUrl, getFramesStyles, getFramesLocalization, getCkoProxyUrl, getTransactionTokenKey, Configuration };
