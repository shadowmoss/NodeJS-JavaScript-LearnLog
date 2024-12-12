const mysql = require('mysql2/promise');


module.exports={
    mysqlPool:async()=>{
        const pool = await mysql.createPool({
            host:'192.168.191.129',
            user:'root',
            database:'fakedata',
            password:'forbug123',
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