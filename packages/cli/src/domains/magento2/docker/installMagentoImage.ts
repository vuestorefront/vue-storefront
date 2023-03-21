import { spawn } from 'child_process';
import removeDockerContainer from './removeDocker';
import { logSimpleErrorMessage } from '../functions/terminalHelpers';

import { note, spinner } from '@clack/prompts';
import picocolors from 'picocolors';
import { t } from 'i18next';

/** Handles Magento 2 Docker Image installation */
const installMagentoImage = async (
  magentoDirName: string,
  magentoDomainName: string
): Promise<any> => {
  const options = {
    cwd: magentoDirName
  };

  const sp = spinner();

  return new Promise((resolve) => {
    const curl = spawn(
      'curl',
      [
        '-s',
        'https://raw.githubusercontent.com/markshust/docker-magento/master/lib/onelinesetup'
      ],
      options
    );
    const bash = spawn('bash', ['-s', '--', magentoDomainName], options);

    note(t('command.generate_store.magento.note_long'));

    sp.start(
      picocolors.cyan(t('command.generate_store.progress.docker_start'))
    );

    curl.stdout.pipe(bash.stdin);

    bash.stdout.on('data', (data) => {
      if (data.toString().includes('System password requested')) {
        sp.stop(
          picocolors.yellow(t('command.generate_store.magento.password'))
        );
      }

      if (data.toString().includes('Restarting containers to apply updates')) {
        sp.start(
          picocolors.cyan(t('command.generate_store.progress.docker_start'))
        );
      }
    });

    bash.stderr.on('data', async (data) => {
      if (data.toString().includes('port is already allocated')) {
        sp.stop();
        logSimpleErrorMessage(t('command.generate_store.magento.port_busy'));
        // delete the directory
        await removeDockerContainer(magentoDirName);
      }

      if (
        data
          .toString()
          .includes('Project directory "/var/www/html/." is not empty')
      ) {
        sp.stop();
        logSimpleErrorMessage(
          'Docker container with such name already exists.'
        );
      }
    });

    bash.on('exit', (code) => {
      if (code === 0) {
        sp.stop(
          picocolors.green(t('command.generate_store.progress.docker_end'))
        );
        resolve(1);
      } else {
        sp.stop(
          picocolors.red(t('command.generate_store.progress.docker_failed'))
        );
      }
    });
  });
};

export default installMagentoImage;
