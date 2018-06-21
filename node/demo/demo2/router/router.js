// 请求文件路径模块，设置静态资源路径
var path = require('path');
var static = path.join(__dirname, './../static');

// 文件系统模块
var fs = require('fs');

// 请求文件系统模块，加载静态资源文件
function readFile (url, res) {
    fs.readFile(url, function (err, data) {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
            return res.end('404 - 该文件不存在');
        };
        res.end(data);
    });
};

// 根据请求 url 显示返回不同内容
function router (req, res) {
    // 根据路由加载静态资源文件
    if (req.url.indexOf('/static') === 0) {
        readFile('./' + req.url, res);
    } else if (req.url === '/') { // 根路由加载首页
        readFile(static + '/index.html', res);
    } else { // 根据路由加载html文件
        readFile(static + req.url + '.html', res);
    }
};

module.exports = router;