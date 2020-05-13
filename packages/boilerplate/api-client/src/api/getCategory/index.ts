import {Category} from '../../types';
import { settings } from '../../index';

export default async function (): Promise<Category[]> {
  if (settings.overrides.getCategory) {
    return settings.overrides.getCategory();
  }

  return new Promise<Category[]>(() => {});
}
