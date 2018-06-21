var demoScript = {
    getUserList: function (number) { // 获取用户列表数据
        axios.get('/api/userList?number='+ number).then(function (res) {
            var data = res.data;
            if (data.err === '0') {
                demoScript.renderListDom(data.data); // 渲染用户列表数据
            }
        })
    },
    renderListDom: function (data) { // 渲染用户列表数据
        var domWrap = document.getElementById('table');
        var domBody = domWrap.querySelector('tbody');
        var html = '';
        data.forEach(function (value) {
            html += '<tr><td>' + value.id + '</td><td><img src="' + value.picUrl + '" /></td><td>' + value.name + '</td><td>' + value.phone + '</td><td>' + value.addTime + '</td><td><a href="detail.html?id=' + value.id + '">详情</a></td></tr>';
        });
        domBody.innerHTML = html;
    },
    getUserDetail: function (id) { // 获取用户详情数据
        axios.get('/api/userDetail?id=' + id).then(function (res) {
            var data = res.data;
            if (data.err === '0') {
                demoScript.renderDetailDom(data.data); // 渲染用户详情数据
            }
        })
    },
    renderDetailDom: function (data) { // 渲染用户详情数据
        var domWrap = document.getElementById('table');
        var domBody = domWrap.querySelector('tbody');
        var html = '<tr><td>Id</td><td>' + data.id + '</td></tr><tr><td>Icon</td><td><img src="' + data.picUrl + '" /></td></tr><tr><td>Name</td><td>' + data.name + '</td></tr><tr><td>Phone</td><td>' + data.phone + '</td></tr><tr><td>Join Time</td><td>' + data.addTime + '</td></tr><tr><td></td><td><a href="/">返回</a></td></tr>';
        domBody.innerHTML = html;
    }
};