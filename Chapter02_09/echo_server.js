const net = require('net');
const server = net.createServer(socket=>{
    // 可被重复触发的事件 data
    // socket.on('data',data=>{
        // console.log("接收到了数据,"+data);
        // socket.write(data)
    // });
    // 只会触发一次的事件
    socket.once('data',data=>{
        console.log("接收到了数据,"+data);
        socket.write(data);
    });
});
server.listen(8888);