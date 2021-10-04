const path = require('path');
const clearTemp = require('./clearTemp');

// uload single file
module.exports = async (file) => {
  try {
    if (file) {
      // get extenstion of the file
      const extension = path.extname(file.name);
      // rename file with adding microtime for avoiding same named image replacing
      const renamedFile =
        path.basename(file.name, extension) +
        '_' +
        new Date().getTime().toString() +
        extension;
      // location of the folder to be uploaded
      const savePath = path.resolve(
        __dirname,
        '../../',
        'uploads',
        'images',
        renamedFile
      );
      // allow only image types
      const acceptedTypes = ['image/jpeg', 'image/png'];
      if (!acceptedTypes.includes(file.mimetype)) {
        return { error: 'file must be an image type' };
      }
      // if size is bigger than given throw error
      if (file.truncated) {
        return { error: 'file size is too big' };
      }
      // move the file into the folder
      await file.mv(savePath);
      // return the accessible path of the file
      // URL = [host] + [path] + [image name]
      return `${process.env.HOSTNAME}/user/picture/${renamedFile}`;
    } else {
      return undefined;
    }
  } catch (error) {
    return { error };
  }
};
