import { removeDir } from "../../../../utils";

export const cleanUpRepositories = async (
  directoryName: string
): Promise<void> => {
  await removeDir(directoryName, ".git");
  await removeDir(directoryName, ".gitHub");
  await removeDir(`${directoryName}/playground/app`, ".git");
  await removeDir(`${directoryName}/playground/app`, ".github");
};
