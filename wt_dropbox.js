const dropboxV2Api = require('dropbox-v2-api');
const fs=require('fs');
const tk="";
const dropbox = dropboxV2Api.authenticate({
    token: tk
});

function upload(filepath,dbfilepath)
{
    dropbox({
    resource: 'files/upload',
    parameters: {
        path: '/Sources/uploads/'+dbfilepath
        },
    readStream: fs.createReadStream(filepath)
    }, (err, result) => {
    console.log("ok");
    fs.unlink(filepath,(err)=>{if(err) console.log(err); else console.log("cleaned");});
    //upload completed
    });
}

function createFolder(dbpath)
{
    dropbox({
    resource: 'files/create_folder_v2',
    parameters: {
        'path': '/Sources/uploads/'+dbpath,
        'autorename': false
        }
    }, (err, result) => {
        console.log("ok");
        
    //see docs for `result` parameters
    });
}

module.exports = {
    upload,
    createFolder
} 