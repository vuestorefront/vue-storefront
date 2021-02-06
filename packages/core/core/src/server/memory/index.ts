import fs from 'fs-extra';
import merge from 'lodash-es/merge';

const createMemory = (rootDir) => {
  const memoryFile = rootDir + '/.vsf/mem.json';

  fs.ensureFileSync(memoryFile);

  const read = () => fs.readJsonSync(memoryFile, { throws: false });

  const save = (content) => {
    const prevContent = read();

    fs.outputJsonSync(memoryFile, merge(prevContent, content));
  };

  return { read, save };
};

export { createMemory };
