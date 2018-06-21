// 加载Web应用框架
var express = require('express');
var app = express();

// 加载文件路径模块，设置静态资源目录
var path = require('path');
app.use(express.static(path.join(__dirname, './../static')));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// 加载接口文件，设置接口访问路径
var api = require('./api');
app.use('/', api);

// 定义HTTP服务器监听的端口
var port = process.env.PORT || 3000;

// 监听端口
app.listen(port, function () {
    console.log('Server listening on ' + port);
});
