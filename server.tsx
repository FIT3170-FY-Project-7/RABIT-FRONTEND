//adapted from: https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/
//temporary solution to test file upload


const express = require('express');         // Express Web Server
const busboy = require('express-busboy');   // Middleware to handle the file upload https://github.com/mscdex/connect-busboy
const path = require('path');               // Used for manipulation with path
const fs = require('fs-extra');
var cors = require('cors')

var app = express()
// var multer = require('multer')
var cors = require('cors')

app.use(cors())

//CORS middleware
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'example.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

const uploadPath = path.join(__dirname, '/uploads/'); // Register the upload path

busboy.extend(app, {
    upload: true,
    path: uploadPath,
    highWaterMark: 2 * 1024 * 1024
})

fs.ensureDir(uploadPath); // Make sure that he upload path exits

let timeStamp = Date.now().toString()

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, __dirname + '/uploads')
//     },
//     filename: function (req, file, cb) {
//         //cb(null, Date.now() + '-' +file.originalname )
//         timeStamp = Date.now().toString()
//         cb(null, timeStamp + '.json')
//     }
// })

// var upload = multer({ storage: storage }).single('file')

// app.post('/uploads', function (req, res) {
//     upload(req, res, function (err) {
//         if (err instanceof multer.MulterError) {
//             return res.status(500).json(err)
//         } else if (err) {
//             console.log(err)

//             return res.status(500).json(err)
//         }
//         return res.status(200).send(req.file)
//     })
// })

app.get('/uploads/', function (req, res) {
    console.log("get")
    const filePath = uploadPath + timeStamp + '.json'
    res.sendFile(filePath)
})

/**
 * Create route /upload which handles the post request
 */
app.post('/uploads', function (req, res) {
    console.log("post")
    req.pipe(req.busboy); // Pipe it trough busboy

    req.busboy.on('file', (fieldname, file, filename) => {
        console.log(`Upload of '${filename}' started`);

        // Create a write stream of the new file
        const fstream = fs.createWriteStream(path.join(uploadPath, filename));
        // Pipe it trough
        file.pipe(fstream);

        // On finish of the upload
        fstream.on('close', () => {
            console.log(`Upload of '${filename}' finished`);
            res.redirect('back');
        });
    });

    return res.status(200).send(req.file)
});

app.get('/uploads/parameters', function (req, res) {
    console.log("get parameters")
    const filePath = __dirname + '/uploads/' + timeStamp + '.json'
    readKeysFromPath(filePath).then((results) => {
        res.send(results)
    });
})

async function readKeysFromPath(path) {
    try {
        var keys = new Array()
        const data = await fs.readFile(path, { encoding: 'utf8' });
        const json = JSON.parse(data)
        const initialKeys = Object.keys(json['posterior']['content'])
        // check for complex entries and exclude them
        for (var i = 0; i < initialKeys.length; i++) {
            if (!json['posterior']['content'][initialKeys[i]][0]['__complex__']) {
                keys.push(initialKeys[i])
            }
        }
        return (keys)
    } catch (err) {
        console.log(err);
    }
}

/**
 * Serve the basic index.html with upload form
 */
app.route('/').get((req, res) => {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write('<form action="upload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="fileToUpload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
});

const server = app.listen(8000, function () {
    console.log(`Listening on port ${server.address().port}`);
});