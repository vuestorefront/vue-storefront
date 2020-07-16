import axios from 'axios';

const processPost = (req) => {
  return new Promise(resolve => {
    let jsonString = '';
    if (req.method === 'POST') {
      req.on('data', data => {
        jsonString += data;
      });

      req.on('end', () => {
        resolve(JSON.parse(jsonString));
      });
    }
  });
};

const wait = (time) => {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
};

const sendJsonResponse = (res, json) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(json);
};
const notFound = next => next({ statusCode: 404, message: 'Not found' });
const badRequest = next => next({ statusCode: 400, message: 'Bad request or server error' });

const apiRequestHeaders = (secretKey) => ({
  authorization: secretKey,
  'Content-Type': 'application/json'
});

const getStoredMethods = async ({ publicKey, secretKey, customerId }) => {
  try {
    const { data } = await axios.get(`https://play-commercetools.cko-playground.ckotech.co/merchants/${publicKey}/customers/${customerId}`, {
      headers: apiRequestHeaders(secretKey)
    });
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

// const removeStoredMethod = async ({ publicKey, secretKey, customerId, paymentInstrumentId }) => {
//     try {
//         let { data } = await axios.delete(`https://play-commercetools.cko-playground.ckotech.co/merchants/${publicKey}/customers/${customerId}`, {
//             headers: apiRequestHeaders(secretKey)
//         })
//         return data
//     } catch (err) {
//         console.log(err)
//         return null
//     }
// }

export default ({ publicKey, secretKey }) => async (req, res, next) => {
  if (req.url !== '/') {
    return notFound(next);
  }

  switch (req.method) {
    case 'POST':
      const body = await Promise.race([
        processPost(req),
        wait(5000)
      ]);
      if (!body || !body.customer_id) {
        return badRequest(next);
      }
      const data = await getStoredMethods({ publicKey, secretKey, customerId: body.customer_id });
      if (data) {
        return sendJsonResponse(res, JSON.stringify(data));
      }
      return badRequest(next);
      // case 'DELETE':
      //     return await removeStoredMethod({ publicKey, secretKey })
    default:
      return notFound(next);
  }
};
