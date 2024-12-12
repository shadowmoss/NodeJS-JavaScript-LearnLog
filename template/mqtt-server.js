const express = require('express');
const bodyParser = require('body-parser');
const Aedes = require('aedes');
const {createServer} = require('net');
const port = 30050
const aedesInstance =Aedes();
const server = createServer(aedesInstance.handle);
const topics = [];
const deviceSNs = [];

const app = express();
app.use(bodyParser.json());         // 支持编码为JSON的请求消息体解析
app.use(bodyParser.urlencoded({extended:true}));    // 支持表单编码消息体解析

app.get('/test/workmode',async (req,res)=>{
   let downTopic = topics.find("down");
   console.log(downTopic);
})

app.get('/test/serverInfo',async (req,res)=>{
    let downTopic = topics.find("down");
   console.log(downTopic);
})

app.listen(87663,(err)=>{
    console.log('当前服务已启动');
})

const mysql = require("./mysql");

let pool =  null;
async function init(){
    pool = await mysql.mysqlPool();
}
init();
server.listen(port,'0.0.0.0',function(){
    console.log("mqtt服务器已启动,监听端口:",port);
    aedesInstance.publish({topic:'aedes/hello',payload:{"content":"我是服务器"+aedesInstance.id}})
})
// 当订阅事件发生时
aedesInstance.on('subscribe',function(subscriptions,client){
    for(let item of subscriptions){
        topics.push(item.topic);
    }
    console.log(`客户端 +${client ? client.id:client} 订阅了主题:${subscriptions.map(s=>s.topic).join('\n')} from broker`+aedesInstance.id);
});

// 当取消订阅事件发生时
aedesInstance.on('unsubscribe',function(subscriptions,client){
    
});

// 当客户端连接上服务器时
aedesInstance.on('client',function(client){
    console.log(`客户端:`+(client?client.id:client)+`连接上服务器`);
});

// 当有客户端或者服务器端发布消息时
aedesInstance.on('publish',async function(packet,client){
    let topicTemp = packet.topic;
    console.log(topicTemp);
    // 当前信息topic是设备上传到平台
    console.log(topicTemp.indexOf('upload'));
    if(topicTemp.indexOf('upload')>0){
        let message = packet.payload.toString();
        let storeData = {};
        message = JSON.parse(message);
        // 如果devsn不在信息当中直接跳过
        console.log(message);
        if(!("devsn" in message)){
            console.log("消息中没有设备sn")
            return;
        }
        // 如果当前设备返回设备上传数据的响应.不管直接跳过
        if("cmd" in message && message.cmd==='getData'){
            console.log("设备响应获取数据")
            return;
        }
        // 设备状态信息跳过
        if("batper" in message && "sig4g" in message && "swver" in message){
            console.log("设备状态信息");
            return;
        }
        storeData.deviceSn = message.devsn;
        if("qc" in message){
            storeData.qc = message.qc;
        }
        
        // 剩下的消息都是数据消息。
        for(let item in message){
            if(item.startsWith("QJRF")){
                // 获取传感器编号
                
                // 倾角计数据 X轴
                if(item.endsWith("_X")){
                    let sensor = item.slice(0,(item.length-2));
                    storeData.sensor = sensor;
                    storeData.x = message[item];
                }
                // Y轴
                if(item.endsWith("_Y")){
                    storeData.y = message[item];
                }
                // Z轴
                if(item.endsWith("_Z")){
                    storeData.z = message[item];
                }
                // 温度
                if(item.endsWith("_T")){
                    storeData.t = message[item];
                }
                storeData.type = "qj";
            }
            if(item.startsWith("JLSZY")){
                // 静力水准数据
                if(item.endsWith("_value")){
                    let sensor = item.slice(0,item.length-6);
                    storeData.sensor = sensor;
                    storeData.jlsz = message[item];
                }
                if(item.endsWith("_temp")){
                    storeData.temp = message[item];
                }
                storeData.type = "jlsz";
            }
            if(item.startsWith("PT100")){
                // 温度计数据
                if(item.endsWith("_T")){
                    let sensor = item.slice(0,item.length-2);
                    storeData.sensor = sensor;
                    storeData.temper = message[item];
                }
                storeData.type="temper";
            }
        }
        storeData.data_time = message.data_time;
        await storeDataToMysql(storeData);
    }
    if(client){
        console.log(`${client ? client.id:'Broker_'+aedesInstance.id} 发布了消息 ${packet.payload.toString()}`);
    }
});

async function storeDataToMysql(storeData){
    console.log(storeData);
    if(storeData.type === "qj"){
        // 存储到倾角数据表
       await storeQJData(storeData);
    }
    if(storeData.type === "jlsz"){
        // 存储到静力水准数据表
        await storeJLSZData(storeData);
    }
    if(storeData.type === "temper"){
        // 存储到静力水准数据表
        await storeTemperData(storeData);
    }
}
async function storeQJData(storeData){
    const angleSql = `Insert into tzkj_qj(deviceSn,qc,sensor,x,y,z,t,data_time)values(?,?,?,?,?,?,?,?)`;
    delete storeData.type;
    let data = [];
    for(let item in storeData){
        data.push(storeData[item]);
    }
    const [result,fields] = await pool.query(angleSql,data);
    console.log("result"+result);
    console.log("fields"+fields);
}
async function storeJLSZData(storeData){
    const jlszSql = `Insert into tzkj_jlsz(deviceSn,qc,sensor,jlsz,temp,data_time)values(?,?,?,?,?,?)`;
    delete storeData.type;
    let data = [];
    for(let item in storeData){
        data.push(storeData[item]);
    }
    const [result,fields] = await pool.query(jlszSql,data);
    console.log("result"+result);
    console.log("fields"+fields);
}

async function storeTemperData(storeData){
    const temperSql = `Insert into tzkj_temper(deviceSn,qc,sensor,temper,data_time)values(?,?,?,?,?)`; 
    delete storeData.type;
    let data = [];
    for(let item in storeData){
        data.push(storeData[item]);
    }
    const [result,fields] = await pool.query(temperSql,data);
    console.log("result"+result);
    console.log("fields"+fields);
}