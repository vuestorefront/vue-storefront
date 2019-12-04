import syswidecas from 'syswide-cas'
import * as fs from 'fs-extra';

const CERTS_DIRECTORY = 'config/certs'

/**
 * load certificates from certs directory and consider them trusted
 */
export default () => {
  if (fs.existsSync(CERTS_DIRECTORY)) {
    syswidecas.addCAs(CERTS_DIRECTORY);
  }
  return 'asdad'
}
