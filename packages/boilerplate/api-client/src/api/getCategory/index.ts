import {Category} from '../../types';
import { settings } from '../../index';

export default settings.overrides.getCategory || async function getCategory(): Promise<Category[]> {
  return new Promise<Category[]>(() => {});
};
