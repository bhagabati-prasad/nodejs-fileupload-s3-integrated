const base64SingleUpload = require('./base64FileUpload/base64SingleUpload');
const { uploadSingleFileS3, uploadMultipleFileS3, getFileStream } = require('./s3FileUpload/s3')

module.exports = {
  base64SingleUpload,
  uploadSingleFileS3,
  uploadMultipleFileS3,
  getFileStream,
};
