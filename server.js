require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http')
const path = require('path');
const {
    base64SingleUpload,
    uploadSingleFileS3,
    uploadMultipleFileS3,
    getFileStream,
    multiFileUpload,
    singleFileUpload,
} = require('./index');


const fileUpload = require('express-fileupload');
app.use(fileUpload());


app.get('/', (req, res) => {
    res.send("Hello World")
})

app.post('/single_upload_s3', async function (req, res) {
    try {
        let image;

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        image = req.files.image;
        const resp = await uploadSingleFileS3(image)
        console.log(resp)
        if (!resp) {
            return res.status(500).send(resp);
        }
        return res.status(200).send({ url: `/images/${resp}` });
    } catch (error) { console.log({ error }); }
});

app.get('/images/:key', (req, res) => {
    const key = req.params.key
    console.log(key);

    const readStream = getFileStream(key)
    readStream.pipe(res)
})

const server = http.createServer(app)

server.listen(3000, () => {
    console.log("Listening on port: 3000")
})
