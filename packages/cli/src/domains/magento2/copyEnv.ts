import { spawn } from 'child_process';
import fs from 'fs';

const copyEnv = async (vsfDirName: string) => {
  const options = {
    cwd: vsfDirName
  };

  const child = spawn('cp', [
    '.env.example',
    '.env'
  ], options);

  child.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  child.stderr.on('data', (data) => {
    console.log(data.toString());
  });

  child.on('close', () => {
    fs.rmSync(`${vsfDirName}/.env.example`);
  });
};

export default copyEnv;
