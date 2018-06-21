// 请求（require）Node.js自带的 http 模块，并且把它赋值给 http 变量
var http = require('http');

// 加载路由文件
var router = require('./router/router');

// 定义HTTP服务器监听的端口
var port = process.env.PORT || 3000

// 调用 http 模块提供的函数：createServer 
http.createServer(function (req, res) {
    router(req, res); // 执行处理 url 回调函数
}).listen(port); // 指定HTTP服务器监听的端口号

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:' + port);