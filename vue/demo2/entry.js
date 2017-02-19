document.getElementById('test').innerHTML = '测试内容1';

require('./app/js/first.js');
require('./app/css/style.css');

var Vue = require('vue');
    new Vue({
        el:'#vue',
        data: {
            message: 'hello vue.js'
        }
    });