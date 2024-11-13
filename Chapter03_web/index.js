const express = require('express');
const app = express();
const articles = [{title:'Example'}];
const bodyParser = require('body-parser');
const Article = require('./model/entity/ArticleDO').Article;
const read = require('node-readability');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());                     // 支持编码为JSON的请求消息体
app.use(bodyParser.urlencoded({extended:true}))     // 支持编码为表单的请求消息体

app.use('/css/bootstrap.css',express.static('node_modules/bootstrap/dist/css/bootstrap.css'));

app.get('/',(req,res)=>{
    res.send('Hello World!');
});

// 获取所有文章
app.get('/articles',(req,res,next)=>{
    Article.all((err,articles)=>{
        if(err){
            return next(err);
        }
        res.send(articles);
    })
})

// 创建一篇文章
app.post('/articles',async (req,res,next)=>{
    const url = req.body.url;
   await read(url,function(err,result,meta){
        if(err || !result){
            res.status(500).send('Error downloading article');
        }
        Article.create(
            {title:url,content:result},
            (err,article)=>{
                if(err){
                    return next(err);
                }else{
                    res.send('OK');
                }
            }
        );
    });
});

// 获取指定文章
app.get('/articles/:id',(req,res,next)=>{
    const id = req.params.id;
    Article.find(id,(err,article)=>{
        if(err){
            return next(err);
        }
        res.send(article);
    })
});


// 删除指定文章
app.delete('articles/:id',(req,res,next)=>{
    const id = req.params.id;
    Article.delete(id,(err)=>{
        if(err){
            return next(err);
        }
        res.send({message:'Deleted'});
    });
});

app.listen(port,()=>{
    console.log(`Express web app available at localhost: ${port}`);
});