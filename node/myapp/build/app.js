var http = require('http'),//要使用HTTP服务器或客户端功能，需引用此模块require('http')
    fs = require('fs'),//文件系统模块是一个简单包装的标准 POSIX 文件 I/O 操作方法集。您可以通过调用require('fs')来获取该模块。文件系统模块中的所有方法均有异步和同步版本。
    events = require('events');

//http服务
http.createServer(function(request, response){
    response.writeHead(200, {'Content-Type': 'text/plain'});
    fs.readFile('data/test.txt', function(err, data){
        if(err){
            return console.error(err);
        }else{
            response.end(data);
        }
    });
}).listen(8888);

console.log('Server running at http://127.0.0.1:8888');

//创建eventEmitter事件
var eventEmitter = new events.EventEmitter();

//创建事件处理程序
var connectHandler = function(){
    console.log('链接成功！');
    eventEmitter.emit('data_received');
};

//绑定connection事件处理器
eventEmitter.on('connection', connectHandler);

//使用匿名函数绑定data_received事件
eventEmitter.on('data_received', function(){
    console.log('数据接收成功！');
});

//触发connection事件
eventEmitter.emit('connection');

console.log('程序执行完毕！');

eventEmitter.removeListener('connection', connectHandler);

console.log(eventEmitter.listenerCount('connection'));

var buf = new Buffer(13);
console.log(buf.write('www.jary8.com'));
console.log(buf.toString());
console.log(buf.toJSON());