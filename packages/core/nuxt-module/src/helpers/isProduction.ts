import { ModuleOptions } from '../types';

export default (options: ModuleOptions): boolean => process.env.NODE_ENV === 'production' || options.coreDevelopment;
