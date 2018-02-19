const express = require('express');
const fileUpload = require('express-fileupload');
const fs=require('fs');
const path=require('path');
const app = express();
const wt_dropbox = require('./wt_dropbox.js');



app.use(fileUpload());


function checkFile(filename) {
    return new Promise((resolve, reject) => {
        fs.stat(filename, (err, stat) => {
            if (err) return reject(err);
            if (!stat.isFile()) return reject('Not a file');
            fs.access(filename, fs.R_OK, err => {
                if (err) reject(err);
                resolve(filename);
                })
            });
        });
}


app.get('/upload',function(req,res){
    checkFile("./upload.html")
    .then(filename => {    
        fs.createReadStream(filename).pipe(res);
        })
    .catch(err => {
        res.send('File not found');
        });
})



app.post('/upload', function(req, res) {
    console.log("click");
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
 
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(path.join('./',sampleFile.name), function(err) {
    if (err)
      return res.status(500).send(err);
 
    wt_dropbox.upload(path.join('./',sampleFile.name),sampleFile.name);
    res.send('File uploaded!');
  });
});

app.listen(3000);

//wt_dropbox.createFolder("user2");
