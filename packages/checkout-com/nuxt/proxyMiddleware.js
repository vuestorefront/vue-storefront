const axios = require('axios');
const express = require('express');
const app = express();

const config = {
  publicKey: null,
  secretKey: null,
  ctApiUrl: null
};

app.use(express.json());

const sendJsonResponse = (res, json) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(json);
};

const sendError = (res, errorCode, errorMessage) => res.status(errorCode).send(errorMessage);

const apiRequestHeaders = () => ({
  headers: {
    authorization: config.secretKey,
    'Content-Type': 'application/json'
  }
});

const getStoredMethods = async ({ customerId }) => {
  try {
    const { data } = await axios.get(
      `${config.ctApiUrl}/merchants/${config.publicKey}/customers/${customerId}`,
      apiRequestHeaders()
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
const removeStoredMethod = async ({ customerId, paymentInstrumentId }) => {
  try {
    return await axios.delete(
      `${config.ctApiUrl}/merchants/${config.publicKey}/customers/${customerId}/payment-instruments/${paymentInstrumentId}`,
      apiRequestHeaders()
    );
  } catch (err) {
    console.log(err);
    return null;
  }
};

app.post('/', async (req, res) => {
  const data = await getStoredMethods({ customerId: req.body.customer_id });
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

app.delete('/:customerId/:paymentInstrumentId', async (req, res) => {
  const response = await removeStoredMethod({
    customerId: req.params.customerId,
    paymentInstrumentId: req.params.paymentInstrumentId
  });
  if (response) {
    return sendJsonResponse(res, JSON.stringify({}));
  }
  return sendError(res, 400, 'Could not remove stored payment instrument');
});

export default ({ publicKey, secretKey, ctApiUrl }) => {
  config.publicKey = publicKey;
  config.secretKey = secretKey;
  config.ctApiUrl = ctApiUrl;
  return app;
};
