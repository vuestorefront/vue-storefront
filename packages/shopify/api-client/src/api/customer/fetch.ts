import {_shopifyCustomClient} from '../../index';
import { customerQuery as query } from './buildQueries';
import { Customer } from '../../types';

const fetch = async (token): Promise<Customer> => {
  return await _shopifyCustomClient.graphQLClient.send(query(token));
};

export default fetch;
