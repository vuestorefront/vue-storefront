import { LogName } from './types';
import { makeMessageStyle } from './makeMessageStyle';
// eslint-disable-next-line @typescript-eslint/ban-types
export function makeMethod(logEnum: LogName, fn: Function) {
  return () => {
    return Function.prototype.bind.apply(fn, [
      console,
      ...makeMessageStyle(logEnum)
    ]);
  };
}
