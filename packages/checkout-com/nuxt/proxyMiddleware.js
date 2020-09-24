const axios = require('axios');
const express = require('express');
const app = express();

let channels = null;

app.use(express.json());

const sendJsonResponse = (res, json) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(json);
};

const sendError = (res, errorCode, errorMessage) => res.status(errorCode).send(errorMessage);

const getChannelSecretKey = channel => channels[channel].secretKey;
const getChannelCtApiUrl = channel => channels[channel].ctApiUrl;
const getChannelPublicKey = channel => channels[channel].publicKey;

const apiRequestHeaders = channel => ({
  headers: {
    authorization: getChannelSecretKey(channel),
    'Content-Type': 'application/json'
  }
});

const getStoredMethods = async ({ customerId, channel }) => {
  try {
    const { data } = await axios.get(
      `${getChannelCtApiUrl(channel)}/merchants/${getChannelPublicKey(channel)}/customers/${customerId}`,
      apiRequestHeaders(channel)
    );
    return data;
  } catch (err) {
    console.log(err);
    if (err.response) {
      console.error(err.response.data);
    }
    return null;
  }
};
const removeStoredMethod = async ({ customerId, paymentInstrumentId, channel }) => {
  try {
    return await axios.delete(
      `${getChannelCtApiUrl(channel)}/merchants/${getChannelPublicKey(channel)}/customers/${customerId}/payment-instruments/${paymentInstrumentId}`,
      apiRequestHeaders(channel)
    );
  } catch (err) {
    console.log(err);
    return null;
  }
};

app.post('/', async (req, res) => {
  const data = await getStoredMethods({ customerId: req.body.customer_id, channel: req.body.channel });
  if (data) {
    return sendJsonResponse(res, JSON.stringify({
      // eslint-disable-next-line
      payment_instruments: [
        ...data.payment_instruments.filter((value, index, self) => {
          return self.findIndex(el => el.id === value.id) === index;
        })
      ]
    }));
  }
  return sendError(res, 400, 'Could not load customer\'s stored payment instruments');
});

app.delete('/:customerId/:paymentInstrumentId/:channel', async (req, res) => {
  const response = await removeStoredMethod({
    customerId: req.params.customerId,
    paymentInstrumentId: req.params.paymentInstrumentId,
    channel: req.params.channel
  });
  if (response) {
    return sendJsonResponse(res, JSON.stringify({}));
  }
  return sendError(res, 400, 'Could not remove stored payment instrument');
});

export default configChannels => {
  channels = {...configChannels};
  return app;
};
