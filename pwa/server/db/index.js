// 加载数据库配置项
var config = require('./config');

// 加载数据库模块，创建数据库连接池
var mysql = require('mysql');
var pool = mysql.createPool(config);

// 查询数据
var query = function (sql, callback) {
    // 创建连接
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log(err);
            return;
        };
        // 根据sql语句，查询数据
        connection.query(sql, function (error, result) {
            connection.release(); // 释放连接
            callback(error, result); // 返回数据
        })
    })
};

module.exports = query;