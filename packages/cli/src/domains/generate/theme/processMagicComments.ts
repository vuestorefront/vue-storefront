import * as fs from "fs";
import removeDevCommentBlocks from "./removeDevCommentBlocks";
import uncommentProjectOnlyBlocks from "./uncommentProjectOnlyBlocks";

const processMagicComments = async (filePath: string): Promise<void> => {
  const contents = await fs.promises.readFile(filePath, {
    encoding: "utf-8",
  });

  await fs.promises.writeFile(
    filePath,
    removeDevCommentBlocks(uncommentProjectOnlyBlocks(contents))
  );
};

export default processMagicComments;
