const sql = require('mssql');

const pools = new Map();
module.exports={
  get:(name,config)=>{
    if(!pools.has(name)){
      if(!config){
        throw new Error("Pool does not exist");
      }
      // 当前数据连接池不存在，创建一个新的连接池
      const pool = new sql.ConnectionPool(config);
      // 当pool的close()方法被调用时，自动将连接池从Map中移除
      const close = pool.close.bind(pool);
      pool.close = (...args)=>{
        pools.delete(name);
        return close(...args);
      }
      pools.set(name,pool.connect());
    }
    return pools.get(name);
  },
  // 关闭所有连接池
  closeAll:()=> Promise.all(Array.from(pools.values())
    .map((connect)=>{
    return connect.then((pool)=>{
        pool.close();
    })
  })),
  sql:sql,
}