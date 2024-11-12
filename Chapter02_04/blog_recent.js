const http = require('http');   // CommonJS模块引入模型 ,引入NodeJS http核心模块
const fs = require('fs');       // 引入NodeJS文件管理核心模块,
http.createServer((req,res)=>{      // 创建http服务器对象，基于回调函数创建响应逻辑
    getTitles(res);
}).listen(8000,'127.0.0.1');
function getTitles(res){
    // 读取json文件
    fs.readFile('./title.json',(err,data)=>{
        if(err){
            console.error(err);
            res.end('Server Error');
        }else{
            getTemplate(JSON.parse(data.toString()),res);
        }
    });
}

function getTemplate(titles,res){
    fs.readFile('./template.html',(err,data)=>{
        if(err){
            hadError(err,res);
        }
        else{
            formatHtml(titles,data.toString(),res);
        }
    });
}
function formatHtml(titles,tmpl,res){
    const html = tmpl.replace('%',titles.join('</li><li>'));
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(html);
}
function hadError(err,res){
    console.error(err);
    res.end('Server Error');
}