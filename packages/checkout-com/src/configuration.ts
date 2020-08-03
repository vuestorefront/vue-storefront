const config = {
  publicKey: null,
  ckoWebHookUrl: 'https://play-commercetools.cko-playground.ckotech.co/api',
  styles: {},
  tokenizedCardKey: 'temporary-tokenized-card'
};

interface Configuration {
  publicKey: string;
  ckoWebHookUrl?: string;
  styles?: any;
  tokenizedCardKey?: string;
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
};

const getPublicKey = () => config.publicKey;
const getCkoWebhookUrl = () => config.ckoWebHookUrl;
const getStyles = () => config.styles;
const getCardTokenKey = () => config.tokenizedCardKey;

export { setup, getPublicKey, getCkoWebhookUrl, getStyles, getCardTokenKey };
