const { error } = require("console");
const Watcher = require("./file_watcher");
const watcher = new Watcher(watchDir,processedDir);
const fs = require("fs");
watcher.on('process',(file)=>{
    const watchFile = `${watchDir}/${file}`;
    const processedFile = `${processedDir}/${file.toLowerCase()}`;
    fs.rename(watchFile,processedFile,err => {
        if(err){
            throw err;
        }
    })
})