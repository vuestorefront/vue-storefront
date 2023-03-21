import { spawn } from 'child_process';
import {
  logSimpleErrorMessage,
  logSimpleSuccessMessage
} from './terminalHelpers';
import { t } from 'i18next';

/** Checking if Docker is installed and running on user's machine */
const checkNode = async (): Promise<void> => {
  const node = spawn('node', ['-v']);

  return await new Promise((resolve) => {
    node.stdout.on('data', (data) => {
      if (!data.toString().includes('v16')) {
        logSimpleErrorMessage(t('command.generate_store.magento.node_not_ok'));
        process.exit(1);
      }
    });

    node.on('close', () => {
      logSimpleSuccessMessage(t('command.generate_store.magento.node_ok'));
      resolve();
    });
  });
};

export default checkNode;
