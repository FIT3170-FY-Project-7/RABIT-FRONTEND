//adapted from: https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/
//temporary solution to test file upload


var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');

app.use(cors())


let timeStamp; 

const storage = multer.diskStorage({
  
    destination: function (req, file, cb) {
    cb(null, __dirname + "/uploads")
  },
  filename: function (req, file, cb) {
    //cb(null, Date.now() + '-' +file.originalname )
    timeStamp = Date.now().toString();
    cb(null, timeStamp + '.json')
  }
})

var upload = multer({ storage: storage }).single('file')




app.post('/uploads',function (req, res)  {
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
            console.log(err)
            
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)    
    })
})


app.get("/uploads/",  function (req, res){
  const filePath = __dirname + "/uploads/" + timeStamp +".json";
  res.sendFile(filePath);
  })





app.listen(8000, function() {
    console.log('App running on port 8000');
});


