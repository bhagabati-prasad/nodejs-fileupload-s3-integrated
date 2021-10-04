const path = require('path');

// uload single file
module.exports = async (mFiles) => {
  try {
    if (mFiles && Array.isArray(mFiles) && mFiles.length) {
      let filePaths = []; // for storing all paths after uploading
      let promises = [];
      // iterate each file and move
      mFiles.forEach((file) => {
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
        // move each file
        promises.push(file.mv(savePath));
        // save each file path
        filePaths.push(`${process.env.HOSTNAME}/user/picture/${renamedFile}`);
      });
      await Promise.all(promises);
      // return uploaded file paths
      return filePaths;
    } else {
      return undefined;
    }
  } catch (error) {
    return { error };
  }
};
