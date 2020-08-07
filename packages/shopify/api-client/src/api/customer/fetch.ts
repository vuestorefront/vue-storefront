import {_shopifyCustomClient} from '../../index';
import { customerQuery as query } from './buildQueries';
import { Customer } from '../../types';

const fetch = async (token): Promise<Customer> => {
  const customer = await _shopifyCustomClient.graphQLClient
    .send(query(token))
    .then(({model}) => {
      return model;
    });
  return customer;
};

export default fetch;
