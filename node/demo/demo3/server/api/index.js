// 加载Web应用框架路由模块
var express = require('express');
var router = express.Router();

// 加载数据库查询方法
var query = require('./../db');

var formatDate = function (date) {
    var newDate = new Date(date);
    return newDate.getFullYear() + '-' + (newDate.getMonth() < 10 ? '0' + (newDate.getMonth() + 1) : (newDate.getMonth() + 1)) + '-' + (newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate());
};

// 路由
router.get('/', function (req, res) {
    // 使用sql语句，调用数据库查询方法获取数据
    query('select * from user', function (err, result) {
        if (err) {
            console.log(err);
        } else {
            var data = [];
            result.forEach(function (value, index) {
                if (index <= 20) {
                    var addTime = value.add_time;
                    if (addTime) {
                        addTime = formatDate(addTime)
                    };

                    // 格式化数据
                    data.push({
                        id: value.id || '',
                        picUrl: value.picUrl || '',
                        name: value.name || '',
                        phone: value.phone || '',
                        addTime: addTime
                    });
                }
            });
            res.render('layout', { title: '列表', pagename: 'index', data: data });
        }
    })
});

// 路由
router.get('/detail/:id', function (req, res) {
    // 获取参数
    var id = req.params.id;

    if (id && id >= 0) {
        // 使用sql语句，调用数据库查询方法获取数据
        query('select * from user where id=' + id, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                var data = {}
                if (result.length) {
                    var addTime = result[0].add_time;
                    if (addTime) {
                        addTime = formatDate(addTime)
                    };

                    // 格式化数据
                    data = {
                        id: result[0].id || '',
                        picUrl: result[0].picUrl || '',
                        name: result[0].name || '',
                        phone: result[0].phone || '',
                        addTime: addTime
                    };
                }
                res.render('layout', { title: '详情', pagename: 'detail', data: data });
            }
        })
    }
});

// 获取用户信息列表接口
router.get('/api/userList', function (req, res) {
    // 获取参数
    var number = req.query.number;

    // 使用sql语句，调用数据库查询方法获取数据
    query('select * from user', function (err, result) {
        if (err) {
            console.log(err);
        } else {
            if (number && number > 0) {
                var data = [];
                result.forEach(function (value, index) {
                    if (index <= number) {
                        var addTime = value.add_time;
                        if (addTime) {
                            addTime = formatDate(addTime)
                        };

                        // 格式化数据
                        data.push({
                            id: value.id || '',
                            picUrl: value.picUrl || '',
                            name: value.name || '',
                            phone: value.phone || '',
                            addTime: addTime
                        });
                    }
                });
                res.json({err: '0', msg: '获取成功', data: data}); // 发送响应数据
            } else {
                res.json({err: '-1', msg: '参数错误', data: []}); // 发送响应数据
            }
        }
    })
});

// 获取用户信息详情接口
router.get('/api/userDetail', function (req, res) {
    // 获取参数
    var id = req.query.id;

    if (id && id >= 0) {
        // 使用sql语句，调用数据库查询方法获取数据
        query('select * from user where id=' + id, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                var addTime = result[0].add_time;
                if (addTime) {
                    addTime = formatDate(addTime)
                };

                // 格式化数据
                var data = {
                    id: result[0].id || '',
                    picUrl: result[0].picUrl || '',
                    name: result[0].name || '',
                    phone: result[0].phone || '',
                    addTime: addTime
                };
                res.json({err: '0', msg: '获取成功', data: data}); // 发送响应数据
            }
        })
    } else {
        res.json({err: '-1', msg: '参数错误', data: {}}); // 发送响应数据
    }
});

module.exports = router;