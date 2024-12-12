const express = require('express');
const bodyParser = require('body-parser');
const mssql = require('./mssql');
const request = require("./api");
const {formatDate,currentTime} = require('./time');
const cron = require('node-cron');

const app = express();
app.use(bodyParser.json());         // 支持编码为JSON的请求消息体解析
app.use(bodyParser.urlencoded({extended:true}));    // 支持表单编码消息体解析

// RTU数据库
const config = {
    user:"jwsd",
    password:"Jwsd@2013",
    server:"www.sctzkj.com",
    database:"jw_monitordb",
    port:18767,
    pool:{
        max:10,
        min:0,
        idleTimeoutMillis:30000
    },
    options: {
        encrypt:false,
      }
};

// GNSS数据库
const configGNSS = {
    user:"jwsd",
    password:"Jwsd@2013",
    server:"www.sctzkj.com",
    database:"jw_monitordb_gnss",
    port:18767,
    pool:{
      max:10,
      min:0,
      idleTimeoutMillis:30000
    },
    options:{
      encrypt:false,
    }
};

let rtuPool = null;
let gnssPool = null;
async function init(){
    rtuPool = await mssql.get("RTU",config);
    gnssPool = await mssql.get("GNSS",configGNSS);
}

async function test(){
    let result = request.get("http://localhost:3001/test/get");
    return result;
}
// 地下水设备推送
async function schedureDX(){
    console.log(currentTime()+"广东云浮，地下水设备推送:");
    const transaction =  rtuPool.transaction();
    await transaction.begin();
    let result = await transaction.request().query(`
                                        select
                                             jmld.id,
                                             td.device_sn,
                                             td.url,
                                             jmld.clttm,
                                             jmld.value
                                             FROM
                                             third_project tp
                                             Join third_devices td ON td.project_id = tp.id
                                             Join JW_MQTT_L3_DX jmld ON td.device_sn = jmld.station
                                             WHERE
                                             td.device_type = 3
                                             and
                                             td.flag = 1
                                             and 
                                             jmld.tzkj_push_flag = 0
                                             and
                                             tp.id = 1
                                        order by jmld.id desc`);
        console.log(currentTime()+"地下水设备查询结束");
    await pushDX(result,transaction);
    await transaction.commit();
}
cron.schedule('*/15 * * * *',()=>{schedureDX()});

app.get('/test/dx',async (req,res)=>{
    schedureDX();
    res.status(200).json("ok");
});

// GNSS设备推送
async function scheduleGNSS(){
    console.log(currentTime()+"广东云浮，GNSS设备推送:");
    const transaction = gnssPool.transaction();
    await transaction.begin();
    let result = await transaction.request().query(`
                    select
                    xpr.id,
                    td.url,
                    td.device_sn,
                    xpr.begindate,
                    xpr.positionx x,
                    xpr.positiony y,
                    xpr.positionz z 
                    FROM
                    third_project tp
                    join third_devices td on td.project_id = tp.id
                    join xb_perioddata_rtcm xpr on xpr.deviceno = td.device_sn
                    where
                    td.flag = 1
                    and
                    tp.id = 1
                    and
                    xpr.tzkj_push_flag = 0
                    and
                    td.device_type = 4
                    ORDER BY xpr.begindate DESC
        `);
    console.log(currentTime()+"GNSS设备查询结束");
    await pushGNSS(result,transaction);
    await transaction.commit();
}
cron.schedule('*/15 * * * *',()=>{scheduleGNSS()});

app.get('/test/gnss',async (req,res)=>{
    scheduleGNSS();
    res.status(200).json("ok");
})

app.listen(3001,(err)=>{
    console.log("端口:3001当前http服务已启动");
});

// 推送地下水
async function pushDX(result,transaction){
    console.log(currentTime()+"进入执行");
        for(let item of result.recordset){
            let device_data = {}
            device_data["collectDateTime"]=formatDate(item.clttm);
            device_data["type"]="jrxJw";
            device_data["value"]=item.value;
            device_data["deviceId"]=item.device_sn;
           await sendDXData(item.url,device_data,item,transaction);
        }
}

// 推送GNSS
async function pushGNSS(result,transaction){
    console.log(currentTime()+"进入GNSS推送执行");
    for(let item of result.recordset){
        let device_data= {}
        device_data["collectDateTime"]=formatDate(item.begindate);
        device_data["type"]="gpsJw";
        device_data["valueX"]=item.y;   // 要求的是北
        device_data["valueY"]=item.x;   // 要求的是东
        device_data["valueH"]=item.z;
        device_data["deviceId"]=item.device_sn;
        await sendGNSS(item.url,device_data,item,transaction);
    }
}

async function sendDXData(url,device_data,item,transaction){
    let data = {};
    let datas=[];
    data["datas"]=datas;
    datas.push(device_data);
    console.log(data);
    const res =  await request.post(url,data).then(async (data)=>{
        console.log(currentTime()+"推送结果,");
        console.log(data.data);
        let result = await transaction.request()
                                .input('id',mssql.sql.Int,item.id)
                                .input('flag',mssql.sql.Int,1)
                                .query(`update
                                        JW_MQTT_L3_DX
                                        set tzkj_push_flag = @flag 
                                        where id = @id`
                                );
    },(err)=>{
        console.log(currentTime()+"地下水推送报错:")
        console.log(err);
    });
}

async function sendGNSS(url,device_data,item,transaction){
    let data = {};
    let datas=[];
    data["datas"]=datas;
    datas.push(device_data);
    console.log(data);
   const res = await request.post(url,data).then(async (data)=>{
        console.log(currentTime()+"推送结果,");
        console.log(data.data);
        let result = await transaction.request()
                                    .input('id',mssql.sql.Int,item.id)
                                    .input('tzkj_push_flag',mssql.sql.Int,1)
                                    .query(`
                                        UPDATE
                                            xb_perioddata_rtcm 
                                            set tzkj_push_flag = @tzkj_push_flag 
                                            where id = @id
                                        `);
    },(err)=>{
        console.log(currentTime()+"GNSS推送报错:");
        console.log(err);
    });
}

init();