import { AxiosError } from 'axios';

export default function isAxiosError (arg: any): arg is AxiosError {
  return arg && arg.isAxiosError;
}
