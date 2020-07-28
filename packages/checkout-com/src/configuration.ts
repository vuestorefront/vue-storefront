const config = {
  publicKey: null,
  ckoWebHookUrl: 'https://play-commercetools.cko-playground.ckotech.co/api',
  styles: {},
  tokenizedCardKey: 'temporary-tokenized-card',
  localization: null
};

interface Configuration {
  publicKey: string;
  ckoWebHookUrl?: string;
  styles?: any;
  tokenizedCardKey?: string;
  localization?: string | CustomLocalization;
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
  config.styles = params.styles || defaultStyles;
  config.tokenizedCardKey = params.tokenizedCardKey || config.tokenizedCardKey;
  config.localization = params.localization || null;
};

const getPublicKey = () => config.publicKey;
const getCkoWebhookUrl = () => config.ckoWebHookUrl;
const getStyles = () => config.styles;
const getCardTokenKey = () => config.tokenizedCardKey;
const getLocalization = () => config.localization;

export { setup, getPublicKey, getCkoWebhookUrl, getStyles, getCardTokenKey, getLocalization, Configuration };
