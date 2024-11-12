const axios = require('axios');

const request = axios.create({
    timeout:60000,
    headers:{
        'Content-Type':'application/json;'
    }
});

function post(url,param){
    return request.post(url,{
            ...param
    });
}
function get(url){
    return request.get(url);
}
exports.post = (url,param)=>post(url,param);
exports.get = (url)=>get(url);
