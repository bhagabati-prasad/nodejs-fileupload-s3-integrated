const fs = require('fs');
const path = require('path');
const FileType = require('file-type');

module.exports = async (file) => {
  try {
    if (file) {
      // to declare some path to store your converted image
      var matches = file.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
        response = {};

      if (matches.length !== 3) {
        return new Error('Invalid input string');
      }

      response.type = matches[1];
      response.data = new Buffer.from(matches[2], 'base64');
      let decodedImg = response;
      let imageBuffer = decodedImg.data;
      // let extension = mime.getExtension(type);
      const { ext } = await FileType.fromBuffer(imageBuffer);
      console.log({ ext });
      const fileName =
        'image' + '_' + new Date().getTime().toString() + '.' + ext;
      const savePath = path.resolve(
        __dirname,
        '../../uploads/images/',
        fileName
      );
      console.log({ savePath });
      fs.writeFileSync(savePath, imageBuffer, 'utf8');
      return `${process.env.HOSTNAME}/user/picture/${fileName}`;
    } else {
      return undefined;
    }
  } catch (e) {
    return { error: e };
  }
};
