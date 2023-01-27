import { spawn } from 'child_process';
import picocolors from 'picocolors';

const handleSampleData = async (magentoDirName: string) => {
  const options = {
    cwd: magentoDirName,
    shell: true
  };

  return new Promise((resolve, reject) => {
    const sampleData = spawn('bin/magento sampledata:deploy && bin/magento setup:upgrade', options);

    sampleData.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    sampleData.stderr.on('data', (data) => {
      console.log(data.toString());
    });

    sampleData.on('close', (code) => {
      if (code === 0) {
        console.log(picocolors.green('Sample data deployed successfully'));
        resolve(1);
      } else {
        reject();
      }
    });
  });
};

export default handleSampleData;
