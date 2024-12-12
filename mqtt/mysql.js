const mysql = require('mysql2/promise');


module.exports={
    mysqlPool:async()=>{
        const pool = await mysql.createPool({
            host:'127.0.0.1',
            port:23308,
            user:'ckjt',
            database:'tzkj',
            password:'Ckjt@2020@0522',
            connectionLimit: 10,
            maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
            idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0,
        });
        return pool;
    },
};