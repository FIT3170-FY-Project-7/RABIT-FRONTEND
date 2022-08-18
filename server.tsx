//adapted from: https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/
//temporary solution to test file upload

var express = require('express')
var app = express()
var multer = require('multer')
var cors = require('cors')
const fs = require('fs/promises');

app.use(cors())

let timeStamp

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/uploads')
    },
    filename: function (req, file, cb) {
        //cb(null, Date.now() + '-' +file.originalname )
        timeStamp = Date.now().toString()
        cb(null, timeStamp + '.json')
    }
})

var upload = multer({ storage: storage }).any('file')

app.post('/uploads', function (req, res) {
    console.log("post received")
    upload(req, res, function (err) {
        console.log("entering upload function")
        if (err instanceof multer.MulterError) {
            console.log("multer error on post")
            console.log(err)
            return res.status(500).json(err)
        } else if (err) {
            console.log("non multer error on post")
            console.log(err)
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)
    })
})

app.get('/uploads/', function (req, res) {
    const filePath = __dirname + '/uploads/' + timeStamp + '.json'
    res.sendFile(filePath)
})

app.listen(8000, function () {
    console.log('App running on port 8000')
})

app.get('/uploads/parameters', function (req, res) {
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