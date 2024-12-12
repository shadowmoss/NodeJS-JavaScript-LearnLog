const request = require('./api.js');
// 1.获取Token
async function getToken(){
    return request.post('https://iot.whirmc.com/prod-api/externalApi/getToken',{
        userName:"tzkj",
        password:"tzkj@987"
    });
}

// 2.查询工程名称获取工程id
 async function getProjectID(param,headers){
    return request.get('https://iot.whirmc.com/prod-api/externalApi/projectList',headers,param);
}

// 3.根据工程id查询工程详情。
async function getProjectDetail(projectId,headers){
    return request.get(`https://iot.whirmc.com/prod-api/externalApi/project/${projectId}`,headers,null);
}
// 4.根据设备Id和工程id,数据点id查询工程数据
 async function getProjectData(param,headers){
    return request.get('https://iot.whirmc.com/prod-api/externalApi/projectHistoryList',headers,param);
}
module.exports.getToken = ()=>getToken();
module.exports.getProjectName = (param,headers)=>getProjectID(param,headers);
module.exports.getProjectDetail = (param,headers)=>getProjectDetail(param,headers);
module.exports.getProjectData = (param,headers)=>getProjectData(param,headers);