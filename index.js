const base64SingleUpload = require('./base64FileUpload/base64SingleUpload');
const { uploadSingleFileS3, uploadMultipleFileS3, getFileStream } = require('./s3FileUpload/s3')
const multiFileUpload = require('./expressFileupload/multiFileUpload')
const singleFileUpload = require('./expressFileupload/singleFileUpload')

module.exports = {
  base64SingleUpload,
  uploadSingleFileS3,
  uploadMultipleFileS3,
  getFileStream,
  multiFileUpload,
  singleFileUpload,
};
