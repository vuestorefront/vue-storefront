import fs from 'fs';
import { simpleLog } from './terminalHelpers';
import picocolors from 'picocolors';
import path from 'path';

const copyEnv = async (vsfDirName: string) => {
  try {
    await fs.copyFileSync(
      path.join(vsfDirName, '.env.example'),
      path.join(vsfDirName, '.env')
    );
  } catch (error) {
    simpleLog(
      'No .env file available. Please check that your git repository is a valid Vue Storefront project',
      picocolors.red
    );
    process.exit(1);
  }

  fs.rmSync(path.join(vsfDirName, '.env.example'));
};

export default copyEnv;
