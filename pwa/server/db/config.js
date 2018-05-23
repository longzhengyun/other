// 数据库配置项
var config = {};

if (process.env.NODE_ENV === 'production') { // 线上正式数据库
    config = {
        host: '',
        port: '',
        user: '',
        password: '',
        database: ''
    };
} else { // 线下测试数据库
    config = {
        host: '',
        port: '',
        user: '',
        password: '',
        database: ''
    };
};

module.exports = config;