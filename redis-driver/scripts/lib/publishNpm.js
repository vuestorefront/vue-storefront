/* eslint-disable unicorn/no-process-exit, unicorn/prefer-module */
const { exec } = require("child_process");

const publishPackages = (pkgPath, labels) => {
  return new Promise((_res, _rej) => {
    try {
      const command = `npm publish ${pkgPath} --access public --tag ${labels}`;

      console.log(command)

      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      });
    } catch (e) {
      console.error(e);
    }
  });
}

module.exports = {
  publishPackages,
}
