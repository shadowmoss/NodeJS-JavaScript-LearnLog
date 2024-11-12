const fs = require('fs');
const request = require('request');
const htmlparser = require('htmlparser');
const configFilename = './rss_feeds.txt';
// 串行化流程执行，等前一个任务的回调执行完成再执行下一个任务。
function checkForRSSFile(){
    console.log("checkForRSSFile");
    const exists = fs.existsSync(configFilename);
        // 确保包含RSS预订源URL列表的文件存在
    console.log(exists);
    if(!exists){
                return next(new Error(`Missing RSS file: ${configFilename}`));
    }
        next(null,configFilename);
}

function readRSSfile(configFilename){           // 读取并解析包含预订源URL
    fs.readFile(configFilename,(err,feedList)=>{
        if(err){
            return next(err);
        }
        feedList = feedList.toString()          // 将预订源URL列表转换成字符串，然后分割成一个数组
                            .replace(/^\s+|\s+$/g,'')
                            .split('\n');
        const random = Math.floor(Math.random() * feedList.length);
        next(null,feedList[random]);
    });
}
function downloadRSSFeed(feedUrl){              // 向选定预订源发送HTTP请求
    request({uri:feedUrl},(err,res,body)=>{
        if(err){
            return next(err);
        }
        console.log(res.statusCode);
        if(res.statusCode !== 200){
            return next(new Error('Abnormal response status code'));
        }
        next(null,body);
    });
}

function parseRSSFeed(rss){
    const handler = new htmlparser.RssHandler();
    const parser = new htmlparser.Parser(handler);
    parser.parseComplete(rss);
    if(!handler.dom.items.length){
        return next(new Error('No RSS items found'));
    }
    const item = handler.dom.items.shift();
    console.log(item.title);
    console.log(item.link);
}

const tasks = [
    checkForRSSFile,
    readRSSfile,
    downloadRSSFeed,
    parseRSSFeed
];
function next(err,result){
    if(err){
        throw err;
    }
    const currentTask = tasks.shift();
    if(currentTask){
        currentTask(result);
    }
}
next();