const models = require('./db');
const express = require('express');
const router = express.Router();

//创建(create) 读取(get) 更新(update) 删除(delete)

//创建账号 接口
router.post('/api/login/createAccount', (req, res) => {
    let newAccout = new models.Login({
        account: req.body.account,
        password: req.body.password
    });

    newAccout.save((err, data) => {
        if(err){
            res.send(err);
        }else{
            res.send('createAccount successed');
        }
    });
});

//获取已有账号 接口
router.get('/api/login/getAccount', (req, res) => {
    models.Login.find((err, data) => {
        if(err){
            res.send(err);
        }else{
            res.send(data);
        }
    });
});

module.exports = router;