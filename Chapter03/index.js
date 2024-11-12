const express = require('express');
const app = express();  // express Node环境下用于搭建Http服务的库,基于Node 的http核心库
const port = process.env.PORT || 3000;
const articles = [{title:'Example'}];
const bodyParser = require('body-parser');  // NodeJS官方的消息体解析器

app.use(bodyParser.json());         // 支持编码为JSON的请求消息体解析
app.use(bodyParser.urlencoded({extended:true}));    // 支持表单编码消息体解析

app.get('/',(req,res)=>{
    res.send('Hello World');
});
// 接下来的是一组简单的CRUD RESTFUL服务接口
app.get('/articles',(req,res,next)=>{
    res.send(articles);
});

// 创建一篇文章
app.post('/articles',(req,res,next)=>{
    const article = {title:req.body.title};
    articles.push(article);
    res.send(article);
})

// 获取指定id的文章
app.get('articles/:id',(req,res,next) => {
    const id = req.params.id;
    console.log('Fetching:',id);
    res.send(articles[id]);
})

// 删除指定文章
app.delete('/articles/:id',(req,res,next)=>{
    const id = req.params.id;
    console.log('Deleteing:',id);
    delete articles[id];
    res.send({message:'Deleted'});
})

app.listen(port,()=>{
    console.log(`Express web app available at locahost: ${port}`);
});

module.exports = app;