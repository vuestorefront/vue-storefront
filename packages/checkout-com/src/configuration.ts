const defaultConfig = {
  publicKey: null,
  ctApiUrl: 'https://play-commercetools.cko-playground.ckotech.co/api',
  tokenizedCardKey: 'temporary-tokenized-card',
  saveInstrumentKey: 'save-instrument',
  card: {
    style: {},
    localization: null
  },
  channels: {},
  currentChannel: null
};

const config = {
  ...defaultConfig
};

interface CardConfiguration {
  style?: any;
  localization?: string | CustomLocalization;
}

interface Configuration {
  publicKey: string;
  ctApiUrl?: string;
  tokenizedCardKey?: string;
  saveInstrumentKey?: string;
  card?: CardConfiguration;
}

interface MultichannelConfiguration {
  channels: {
    [channelKey: string]: Configuration;
  };
  defaultChannel: string;
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

const setChannel = (channel: string) => {
  if (!config.channels[channel]) {
    console.error('[CKO] Requested channel does not exist in the config');
    return;
  }
  const pickedChannel = config.channels[channel];
  config.publicKey = pickedChannel.publicKey;
  config.card.style = pickedChannel.card?.style || defaultStyles;
  config.card.localization = pickedChannel.card?.localization || null;
  config.tokenizedCardKey = pickedChannel.tokenizedCardKey || config.tokenizedCardKey;
  config.saveInstrumentKey = pickedChannel.saveInstrumentKey || config.saveInstrumentKey;
  config.ctApiUrl = pickedChannel.ctApiUrl || config.ctApiUrl;
  config.currentChannel = channel;
};

const setup = ({ channels, defaultChannel }: MultichannelConfiguration) => {
  if (!channels[defaultChannel]) {
    console.error('[CKO] Bad config provided');
    return;
  }
  config.channels = channels;
  setChannel(defaultChannel);
};

const getPublicKey = () => config.publicKey;
const getApiUrl = () => config.ctApiUrl;
const getCkoProxyUrl = () => `${window.location.origin}/cko-api`;
const getFramesStyles = () => config.card.style;
const getFramesLocalization = () => config.card.localization;
const getTransactionTokenKey = () => config.tokenizedCardKey;
const getSaveInstrumentKey = () => config.saveInstrumentKey;
const getCurrentChannel = () => config.currentChannel;

export { defaultConfig, setChannel, setup, getPublicKey, getCurrentChannel, getApiUrl, getFramesStyles, getFramesLocalization, getCkoProxyUrl, getTransactionTokenKey, getSaveInstrumentKey, Configuration, CardConfiguration };
