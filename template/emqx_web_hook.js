const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());         // 支持编码为JSON的请求消息体解析
app.use(bodyParser.urlencoded({extended:true}));    // 支持表单编码消息体解析

app.post('/emqx/zhiyan/',async (req,res)=>{
    console.log(req.body);
    // console.log(req.body.payload);
    res.status(200).json("ok");
})
app.listen(3002,(err)=>{
    console.log("当前http服务已启动");
})