const EventEmitter = require('events').EventEmitter;
// 用Node自带的事件模块定义一个事件发生器对象
const channel=new EventEmitter();
// 创建了一个事件监听
channel.on('join',()=>{
    console.log('Welcome!');
});
// 触发一下join事件，以触发其对应的监听回调
channel.emit('join');