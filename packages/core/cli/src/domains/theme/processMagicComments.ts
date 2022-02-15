import * as fs from 'fs/promises';
import removeDevCommentBlocks from './removeDevCommentBlocks';
import uncommentProjectOnlyBlocks from './uncommentProjectOnlyBlocks';

const processMagicComments = async (filePath: string): Promise<void> => {
  const contents = await fs.readFile(filePath, {
    encoding: 'utf-8'
  });

  await fs.writeFile(
    filePath,
    removeDevCommentBlocks(uncommentProjectOnlyBlocks(contents))
  );
};

export default processMagicComments;
