var WorkFlow = require('./workflow');


var json = {
	title: '酒店UED 环境配置说明文档',
    content : 'this.content',
    category : ['R&D 酒店 UED前端','R&D UED Hotel'],
    submitDate: new Date(),
    createDate: new Date()
};

var db = new WorkFlow(json);
	db.create(function(err, workflow){
	    if(err){
	        console.log(err);
	    }
	    console.log(workflow);
	})