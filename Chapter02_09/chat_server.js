const events = require('events');
const net = require('net');
const channel = new events.EventEmitter();
channel.clients = {};   // 连接到服务器的客户端
channel.subscriptions = {}; // 可以连接的频道
// 客户端加入之后需要执行的加入频道的操作
channel.on('join',function(id,client){

    const welcome=`Welcome
    Guests online: ${this.listeners('broadcast').length}`;
    client.write(`${welcome}\n`);
    // 保存当前连接服务器的客户端id
    this.clients[id]=client;

    // 根据客户端id,保存一个函数，该函数处理，客户端上传到服务器的消息和对应发送客户端的id
    // 并且当发送消息的客户端id和当前处理这个消息的客户端的id不相同时,才将消息发送至当前客户端。
    this.subscriptions[id] = (senderId,message) =>{
        console.log("当前发送消息的客户端"+id);
        if(id != senderId){
            this.clients[id].write(message);
        }
    }
    // 注册一个关于boradcast事件的回调，该回调是:加入了频道的客户端的消息接收回调
    this.on('broadcast',this.subscriptions[id]);
});
// 向channel事件对象注册leave事件,及其监听回调
channel.on('leave',function(id){
    console.log("当前离开聊天频道的"+id);
    channel.removeListener('boradcast',this.subscriptions[id])
    channel.emit('broadcast',id,`${id} has left the chatroom. \n`);
});
// 添加一个关闭聊天频道的事件，及其监听回调
channel.on('shutdown',()=>{
    channel.emit('broadcast','','The server has shut down.\n');
    channel.removeAllListeners('broadcast');
});
const server = net.createServer(client => {
    const id = `${client.remoteAddress}:${client.remotePort}`;
    channel.emit('join',id,client);
    client.on('data',data=>{
        data=data.toString();
        console.log(data);
        if(data=== 'shutdown'){
            // 在接受到shutdown字符串时,关闭聊天服务
            channel.emit('shutdown');
        }
        console.log("触发广播事件");
        channel.emit('broadcast',id,data);
    });
    client.on('close',()=>{
        channel.emit('leave',id);   // 在用户断开连接时发出leave事件
    })
});
server.listen(8888);