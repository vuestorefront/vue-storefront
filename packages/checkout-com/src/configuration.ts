const defaultConfig = {
  publicKey: null,
  ctApiUrl: 'https://play-commercetools.cko-playground.ckotech.co/api',
  tokenizedCardKey: 'temporary-tokenized-card',
  saveInstrumentKey: 'save-instrument',
  card: {
    style: {},
    localization: null
  },
  klarna: {
    containerSelector: '#klarna_container',
    mounted: () => {}
  },
  channels: {},
  currentChannel: null
};

const config = {
  // TODO: Deep copy
  ...defaultConfig
};

interface CardConfiguration {
  style?: any;
  localization?: string | CustomLocalization;
}

interface KlarnaConfiguration {
  // #klarna_container
  containerSelector: string;
  mounted?: (response: any) => void;
}

interface Configuration {
  publicKey: string;
  ctApiUrl?: string;
  tokenizedCardKey?: string;
  saveInstrumentKey?: string;
  card?: CardConfiguration;
  klarna?: KlarnaConfiguration;
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
  config.klarna.containerSelector = pickedChannel.klarna?.containerSelector || config.klarna.containerSelector;
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
const getCurrentChannel = () => config.currentChannel;

// Storage Map Keys
const getTransactionTokenKey = () => config.tokenizedCardKey;
const getSaveInstrumentKey = () => config.saveInstrumentKey;

// URLs
const getApiUrl = () => config.ctApiUrl;
const getCkoProxyUrl = () => `${window.location.origin}/cko-api`;

// Frames
const getFramesStyles = () => config.card.style;
const getFramesLocalization = () => config.card.localization;

// Klarna
const getKlarnaContainerSelector = () => config.klarna.containerSelector;
const getKlarnaOnMounted = () => config.klarna.mounted;

export {
  defaultConfig,
  setChannel,
  setup,
  getPublicKey,
  getCurrentChannel,
  getApiUrl,
  getFramesStyles,
  getFramesLocalization,
  getCkoProxyUrl,
  getTransactionTokenKey,
  getSaveInstrumentKey,
  getKlarnaContainerSelector,
  getKlarnaOnMounted,
  Configuration,
  CardConfiguration,
  KlarnaConfiguration
};
