import { spawn } from 'child_process';
import fs from 'fs';
import { simpleLog } from './terminalHelpers';
import picocolors from 'picocolors';

const copyEnv = async (vsfDirName: string) => {
  const options = {
    cwd: vsfDirName
  };

  const child = spawn('cp', ['.env.example', '.env'], options);

  child.stderr.on('data', () => {
    simpleLog(
      'No .env file available. Please check that your git repository is a valid Vue Storefront project',
      picocolors.red
    );
    process.exit(1);
  });

  child.on('close', () => {
    fs.rmSync(`${vsfDirName}/.env.example`);
  });
};

export default copyEnv;
