import config from 'config';

import ErrorMessage from './type/ErrorMessage';

const FACILITY_NAME = 'client-js-error';
const GELF_ACCEPTED_STATUS = 202;
const GELF_SPEC_VERSION = '1.1';

export async function sendErrorMessage (
  errorMessage: ErrorMessage,
  userAgent: string,
  clientIp: string,
  traceId: string
): Promise<void> {
  const data = {
    version: GELF_SPEC_VERSION,
    host: window.location.hostname,
    short_message: errorMessage.shortMessage,
    full_message: errorMessage.fullMessage,
    _current_url: errorMessage.currentUrl,
    _facility: FACILITY_NAME,
    _user_agent: userAgent,
    _client_ip: clientIp,
    _trace_id: traceId,
    _file: errorMessage.file,
    _line: errorMessage.line
  }

  const response = await fetch(
    config.errorLogging.serviceUrl,
    {
      method: 'POST',
      body: JSON.stringify(data)
    }
  );

  if (response.status !== GELF_ACCEPTED_STATUS) {
    throw new Error('An error has occurred while logging');
  }
}
