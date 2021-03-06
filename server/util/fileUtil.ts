import fs from 'fs';
import path from 'path';

import config from '../../config';

const createDirectory = (options: {path: string}) => {
  if (options.path) {
    fs.mkdir(options.path, {recursive: true}, (error) => {
      if (error) {
        console.trace('Error creating directory.', error);
      }
    });
  }
};

const isAllowedPath = (resolvedPath: string) => {
  if (config.allowedPaths == null) {
    return true;
  }
  return config.allowedPaths.some((allowedPath) => {
    if (resolvedPath.startsWith(allowedPath)) {
      return true;
    }
    return false;
  });
};

const sanitizePath = (input: string) => {
  // eslint-disable-next-line no-control-regex
  const controlRe = /[\x00-\x1f\x80-\x9f]/g;
  return path.resolve(input).replace(controlRe, '');
};

const accessDeniedError = () => {
  const error = new Error() as NodeJS.ErrnoException;
  error.code = 'EACCES';
  return error;
};

const fileUtil = {
  createDirectory,
  isAllowedPath,
  sanitizePath,
  accessDeniedError,
};

export default fileUtil;
