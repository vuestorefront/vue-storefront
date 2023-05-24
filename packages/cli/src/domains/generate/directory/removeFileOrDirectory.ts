import rimraf from 'rimraf';
import { promisify } from 'util';

const removeFileOrDirectory = promisify(rimraf);

export default removeFileOrDirectory;
