// 请求（require）Node.js自带的 http 模块，并且把它赋值给 http 变量
var http = require('http');

// 调用 http 模块提供的函数：createServer 
http.createServer(function (request, response) {
    // 发送响应数据 "Hello World"
    response.end('Hello World\n');
}).listen(3000); // 指定HTTP服务器监听的端口号

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:3000/');