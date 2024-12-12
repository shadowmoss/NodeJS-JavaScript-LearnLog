const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const time = require('./time');
const mysql = require('./mysql');
const guiyangApi = require('./guiyangApi');
const NodeCache = require("node-cache");
const { columns } = require('mssql');
// 设置token的过期时间为30天,检查评率为10天一次。
const myCache = new NodeCache({stdTTL:2592000,checkperiod:1});

const app = express();
app.use(bodyParser.json());         // 支持编码为JSON的请求消息体解析
app.use(bodyParser.urlencoded({extended:true}));    // 支持表单编码消息体解析

let pool =  null;

// 1.初始化时将token存入cache
async function init(){
    pool = await mysql.mysqlPool();
    let token = await guiyangApi.getToken();
    myCache.set("token",token.data.data.token,10);
    console.log(Date.now());
    myCache.on("expired", async function(key,value){
        if(key==='token'){
            console.log("token过期了");
           let token = await guiyangApi.getToken();
           myCache.set("token",token.data.token);
        }
    });
   await getProjectID();
}
init();
// 
async function getProjectID(){
    const queryProject = {
        projectName:"遵义湘江河",
        projectStatus:2,
        projectType:3
    }
    const token = myCache.get("token");
    const headers = {
        Authorization:token
    };
    const projectInfo = await guiyangApi.getProjectName(queryProject,headers);
    const projectId = projectInfo.data.data[0].projectId;
    getProjectDetail(projectId);
}
// 工程详情
async function getProjectDetail(projectId){
    const token = myCache.get("token");
    const headers = {
        Authorization:token
    };
    const projectDetail =  await guiyangApi.getProjectDetail(projectId,headers);
    const deviceId = projectDetail.data.data.deviceVos[0].deviceId;
    const projectChannelDataId = projectDetail.data.data.projectChannelDataList.map((item)=>item.projectChannelDataId);
    getProjectData(projectId,deviceId,projectChannelDataId);
}

// 获取工程历史数据
async function getProjectData(projectId,deviceId,channelIds){
    const token = myCache.get("token");
    const headers = {
        Authorization:token
    };
    const param = {
        projectId:projectId,
        channelIds:[...channelIds],
        startTime:"2024-12-3 14:00:00",
        endTime:"2024-12-3 14:44:00"
    }
    
    const projectHistoryData = await guiyangApi.getProjectData(param,headers);
    console.log(projectHistoryData.data.data);
    for(let item of projectHistoryData.data.data.rows){
        // 倾角数组
        let angle = [];
        // 静力水准数组
        let jlsz = [];
        // 温度计
        let temper = [];
        for(let value in item){
            // 倾角数据
            if(value.startsWith("QJRF")&&value.endsWith("_data")){
                let sn = value.slice(0,7);
                let qj = angle.find((item)=>{
                    if(item.deviceSn === sn){
                        return item
                    }
                    return null;
                })
                if(!qj){
                    qj = {
                        deviceSn:sn
                    }
                    angle.push(qj);
                }
                let dataType = value.slice(0,9);
                if(dataType.endsWith("_X")){
                    qj.x = item[value];
                }
                if(dataType.endsWith("_Y")){
                    qj.y = item[value];
                }
                if(dataType.endsWith("_Z")){
                    qj.z = item[value];
                }
            }
            // 静力水准数据
            if(value.startsWith("JLSZY")&&value.endsWith("_data")){
                let index = value.indexOf("value");
                let sn = value.slice(0,index-1);
                let sz = jlsz.find((item)=>{
                    if(item.deviceSn === sn){
                        return item
                    }
                    return null;
                })
                if(!sz){
                    sz={
                        deviceSn:sn
                    }
                    jlsz.push(sz);
                }
                sz.value=item[value];
            }
            // 温度计数据
            if(value.startsWith("PT100")&&value.endsWith("_data")){
                let sn = value.slice(0,9);
                let temp = temper.find((item)=>{
                    if(item.deviceSn===sn){
                        return item
                    }
                    return null;
                });
                if(!temp){
                    temp={
                        deviceSn:sn
                    }
                    temper.push(temp);
                }
                temp.value = item[value];
            }
        }
        await store(jlsz,angle,temper,item.data_time,qc);
    }
}

async function store(jlsz,angle,temper,time,qc){
    const qcSelect = `select id,qc_count from qc_table order by id desc limit 10,1`
    const angleSql = `Insert into tzkj_qj(deviceSn,x,y,z,time,qc)values(?,?,?,?,?)`;
    const angleSqltemp = null;
    const jlszSql = `Insert into tzkj_jlsz(deviceSn,value,time,qc)values(?,?,?)`;
    const jlszSqltemp = null;
    const temperSql = `Insert into tzkj_temper(deviceSn,value,time,qc)values(?,?,?)`;
    const temperSqltemp = null;

    // 倾角数据数组
    const angleValues = [];
    for(let item of angle){
        angleValues.push(item.deviceSn);
        angleValues.push(item.x);
        angleValues.push(item.y);
        angleValues.push(item.z);
        angleValues.push(time);
        if(angleSqltemp===null){
            angleSqltemp = angleSql;
        }else{
            angleSqltemp +=",(?,?,?,?,?)";
        }
    }
    // 静力水准仪数组
    const jlszValues = [];
    for(let item of jlsz){
        jlszValues.push(item.deviceSn);
        jlszValues.push(item.value);
        jlszValues.push(time);
        if(jlszSqltemp===null){
            jlszSqltemp = jlszSql;
        }else{
            jlszSqltemp +="(?,?,?)";
        }
    }
    // 温度数组
    const temperValues = [];
    for(let item of temper){
        temperValues.push(item.deviceSn);
        temperValues.push(item.value);
        temperValues.push(time)
        if(temperSqltemp===null){
            temperSqltemp = temperSql;
        }else{
            temperSqltemp +="(?,?,?)";
        }
    }
    const [angleResult,angleFields] =  await pool.query(angleSql,angleValues);
    const [jlszResult,jlszFields] = await pool.query(jlszSql,jlszValues);
    const [temperResult,temperFields] = await pool.query(temperSql,temperValues);
}
app.get('/start/test/',async(req,res)=>{
    guiyangApi.getProjectData();
    res.json({
        status:200,
        message:"消息请求完成"
    });
})

app.listen(3002,(err)=>{
    console.log('当前服务已启动');
});