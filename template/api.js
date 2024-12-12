const axios = require('axios');

const request = axios.create({
    timeout:60000,
    headers:{
        'Content-Type':'application/json;'
    }
});

function post(url,param){
    console.log(param);
    return request.post(url,{
            ...param
    });
}
function get(url,headers,param){
    return request.get(url,{
        headers:{
            ...headers
        },
        params:{
            ...param
        }
    });
}
exports.post = (url,param)=>post(url,param);
exports.get = (url,headers,param)=>get(url,headers,param);
