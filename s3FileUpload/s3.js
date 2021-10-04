const S3 = require('aws-sdk/clients/s3')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

// console.log({ bucketName, region, accessKeyId, secretAccessKey });

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

async function uploadSingleFileS3(image) {

    const uploadParams = {
        Bucket: bucketName,
        Body: image.data,
        Key: Date.now() + image.name
    }

    const S3Resp = await s3.upload(uploadParams).promise()
    return `${process.env.HOSTNAME}/images/${S3Resp.Key}`
}

async function uploadMultipleFileS3(mFiles) {
    try {
        if (mFiles && Array.isArray(mFiles) && mFiles.length) {
            console.log({ mFiles });
            let filePaths = []; // for storing all paths after uploading
            // iterate each file and move
            mFiles.forEach(async (file) => {
                const acceptedTypes = ['image/jpeg', 'image/png'];
                if (!acceptedTypes.includes(file.mimetype)) {
                    return { error: 'file must be an image type' };
                }
                // if size is bigger than given throw error
                if (file.truncated) {
                    return { error: 'file size is too big' };
                }
                const uploadParams = {
                    Bucket: bucketName,
                    Body: file.data,
                    Key: Date.now() + file.name
                }
                // upload eachfile to  
                const resp = await uploadSingleFileS3(file)
                filePaths.push(resp);
            });
            // return uploaded file paths
            return filePaths;
        } else {
            return undefined;
        }
    } catch (error) {
        return { error };
    }
}

function getFileStream(fileKey) {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }

    return s3.getObject(
        downloadParams
    ).createReadStream()
}


module.exports = { uploadSingleFileS3, uploadMultipleFileS3, getFileStream }