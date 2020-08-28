import path from 'path';
import { copyThemeFiles, getProjectDirectoryName } from '../../utils/helpers';
import updatePackageJson from '../createProject/updatePackageJson';

const copyProjectScript = async (integration: string, targetPath: string) => {
  const resolvedTargetPath = path.resolve(__dirname, `../../../templates/${integration}`);
  await copyThemeFiles(
    resolvedTargetPath,
    path.isAbsolute(targetPath)
      ? targetPath
      : path.join(__dirname, targetPath),
    resolvedTargetPath
  );

  const absoluteTargetPath = path.isAbsolute(targetPath)
    ? targetPath
    : path.join(__dirname, targetPath);

  const packageJsonPath = path.join(absoluteTargetPath, 'package.json');
  await updatePackageJson(packageJsonPath, getProjectDirectoryName(targetPath));
};

export default copyProjectScript;
