import ServerError from 'src/modules/shared/types/server-error';

import { ServerResponse } from '../types/DiffLog';

const successStatusCode = '200';

export default function throwServerErrorFromDiffLog (diffLog: any) {
  diffLog.serverResponses.forEach((response: ServerResponse) => {
    if (response.status.toString() !== successStatusCode) {
      throw new ServerError(response.result.result);
    }
  });
}
