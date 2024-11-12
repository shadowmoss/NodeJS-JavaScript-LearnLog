// 数据默认查询出来的时间为UTC+0零时区时间，最好同其一致
function formatDate(date){
    let year = date.getUTCFullYear();
    let month = '0'+(date.getUTCMonth()+1);
    let day = '0'+date.getUTCDate();
    let hour = '0'+date.getUTCHours();
    let min = '0'+date.getUTCMinutes();
    let second = '0'+date.getSeconds();
    return `${year}-${month.slice(-2)}-${day.slice(-2)} ${hour.slice(-2)}:${min.slice(-2)}:${second.slice(-2)}`;
}

module.exports.formatDate = (date)=>formatDate(date);