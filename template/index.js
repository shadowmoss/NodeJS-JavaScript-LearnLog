const express = require('express');
const bodyParser = require('body-parser');
const mssql = require('./mssql');
const request = require("./api");
const time = require('./time');
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

// cron.schedule('*/1 * * * *',()=>{
//     console.log("时间执行");
// });

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
    console.log("广东云浮，地下水设备推送:");
    const transaction =  rtuPool.transaction();
    console.log(transaction);
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
                                             td.device_type = 1
                                             and
                                             td.flag = 1
                                             and 
                                             jmld.tzkj_push_flag = 0
                                             and
                                             tp.id = 1
                                        order by jmld.id desc`);
        console.log("地下水设备查询结束");
    await pushDX(result,transaction);
    await transaction.commit();
    res.status(200).json('ok');
}
// cron.schedule('* * * * *',schedureDX);

app.get('/test/dx',async (req,res)=>{
    schedureDX();
    res.status(200).json("ok");
});

// GNSS设备推送
async function scheduleGNSS(){
    console.log("广东云浮，GNSS设备推送:");
    const transaction = new sql.Transaction(gnssPool);
    await transaction.begin();
    let result = await transaction.request().query(`
                    select
                    vggo.id
                    td.device_sn,
                    vggo.CD01,
                    vggo.PX01 x,
                    vggo.PY01 y,
                    vggo.PZ01 z 
                    FROM
                    third_project tp
                    join third_devices td on td.project_id = tp.id
                    join vw_gps_gt_od vggo on vggo.deviceNo = td.device_sn
                    where
                    td.flag = 1
                    and
                    tp.id = 1
                    and
                    vggo.tzkj_push_flag = 0
                    ORDER BY vggo.CD01 DESC
        `);
    console.log("GNSS设备查询结束");
    await pushGNSS(result,transaction);
    res.status(200).json('ok');
}
// cron.schedule('* * * * *',scheduleGNSS());

app.get('/test/gnss',async (req,res)=>{
    scheduleGNSS();
    res.status(200).json("ok");
})

app.listen(3001,(err)=>{
    console.log("当前http服务已启动");
});

// 推送地下水
async function pushDX(result,transaction){
    console.log("进入执行");
        for(let item of result.recordset){
            let device_data = {}
            device_data["collectDateTime"]=time.formatDate(item.clttm);
            device_data["type"]="jrxJw";
            device_data["value"]=item.value;
            device_data["deviceId"]=item.device_sn;
           await sendDXData(item.url,device_data,item,transaction);
        }
}

// 推送GNSS
async function pushGNSS(result,transaction){
    console.log("进入GNSS推送执行");
    for(let item of result.recordset){
        let device_data= {}
        device_data["collectDateTime"]=time.formatDate(item.clttm);
        device_data["type"]="gpsJw";
        device_data["valueX"]=item.value;
        device_data["valueY"]=item.value;
        device_data["valueH"]=item.value;
        device_data["devieId"]=item.device_sn;
        await sendGNSS(url,device_data,transaction);
    }
}

async function sendDXData(url,device_data,item,transaction){
    let data = {};
    let datas=[];
    data["datas"]=datas;
    datas.push(device_data);
    console.log(data);
    await request.post(url,data).then(async ()=>{
        console.log("推送成功,")
        let result = await transaction.request()
                                .input('id',mssql.sql.Int,item.id)
                                .input('flag',mssql.sql.Int,1)
                                .query(`update
                                        SET tzkj_push_flag = @flag
                                        from JW_MQTT_L3_DX
                                        where id = @id`
                                );
        console.log(result.recordset);
    },(err)=>{

    });
}

async function sendGNSS(url,device_data,transaction){
    let data = {};
    let datas=[];
    data["datas"]=datas;
    datas.push(device_data);
    await request.post(url,data).then(async ()=>{
        console.log("推送成功")
        let result = await transaction.request()
                                    .input('id',mssql.sql.Int,item.id)
                                    .input('tzkj_push_flag',mssql.sql.Int,1)
                                    .query(`
                                        UPDATE
                                            set tzkj_push_flag = @tzkj_push_flag
                                            from 
                                            xb_perioddata_rtcm xpr 
                                            where xpr.id = @id
                                        `);
        console.log(result.recordset);
    },(err)=>{

    });
}

init();