var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    request = require('request'),
    config = require('./../config');

// Schema 结构
var SCHEMA_OPTS = {
    title : {type : String},
    content : {type : String},
    category : {type : Array},
    creator : {type : String},
    fileLink : {type : Array, default: []},
    submitDate : {type : Date },//更新时间
    createDate : {type : Date }//创建时间
},
    workFlowSchema = new mongoose.Schema(SCHEMA_OPTS,{
    collection: config.DB.COLLECTION.WORKFLOW
});

var workFlowModel = mongoose.model('WorkFlow', workFlowSchema);

function WorkFlow(workflow){
    this.title = workflow.title;
    this.content = workflow.content;
    this.category = workflow.category;
    this.creator = workflow.creator;
    this.fileLink = workflow.fileLink;
    this.submitDate = workflow.submitDate;
    this.createDate = workflow.createDate;
}

WorkFlow.prototype.create = function(callback){
    var workflow = {
        title: this.title,
        content : this.content,
        category : this.category,
        creator : this.creator,
        fileLink : this.fileLink,
        submitDate: this.submitDate,
        createDate: this.createDate
    }

    var newWorkFlow = new workFlowModel(workflow);

    newWorkFlow.save(function(err, workflow){
        if(err){
            // console.log(err.toString());
            logger.error(err);
            return callback(err);
        }
        callback(null, workflow);
    })
}

// WorkFlow.getAll = function(callback, key, sortWay){
//     workFlowModel.find().select('_id title content category submitDate').sort('-'+key).exec(callback);
// }

// WorkFlow.getByName = function(name, callback, key, sortWay){
//     var regName = new RegExp(name,'i');
//     var mongoCollection = workFlowModel.find({"$or" :  [ { 'proName':regName }, {'person.value' : regName , 'person.group' : 'CSS'} ] });
//     mongoCollection.select('_id title content category submitDate').sort('-'+key).exec(callback);
// }

// WorkFlow.deleteById = function(id, callback){
//     workFlowModel.findByIdAndRemove(id,function(err, workflow){
//         callback(null, workflow);
//     })
// }

WorkFlow.updateById = function(id, itemInfo, options, callback){
    workFlowModel.findByIdAndUpdate(id, {$set: itemInfo}, options, function(err, workflow){
        if(err){
            return callback(err, workflow);
        }
        callback(null, workflow);
    })
}

WorkFlow.update = function (id, item, callback) {
    workFlowModel.update({_id: id}, {$set: item}, function (err, num) {
        callback(err, num);
    });
}

WorkFlow.getById = function(id, callback){
    workFlowModel.findById(id,function(err, workflow){
        if(err){
            return callback(err, workflow);
        }
        callback(null, workflow);
    })
}

WorkFlow.getPagingDataByKeyword = function (regName, page, pageSize, callback) {
    if(!regName){
        regName = /./;
    }else{
        regName = new RegExp(regName,'i');
    }
    var paramArr = [
        {'title': regName},
        {'category': regName},
        {'creator': regName}
    ];
    workFlowModel
        .find({"$or": paramArr})
        .sort('-submitDate').skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec(function(err, datas){
            callback(err, datas);
        });
}

WorkFlow.getCountByKeyword = function (regName, callback) {
    if(!regName){
        regName = /./;
    }else{
        regName = new RegExp(regName,'i');
    }
    var paramArr = [
        {'title': regName},
        {'category': regName},
        {'creator': regName}
    ];
    workFlowModel
        .find({"$or": paramArr})
        .count(function (err, count) {
            callback(err, count);
        })
}

// WorkFlow.getCountByGroup = function(name, callback){
//     workFlowModel.find({proClass: name}).count(function (err, count) {
//         callback(err, count);
//     })
// }

WorkFlow.getCountByMonth = function (type, startDate, endDate, callback) {
    var opts = [
        {
            $match: {
                createDate: {$gte: startDate, $lte: endDate}
            }
        },
        {
            $group: {
                _id : {
                    month: { $month: "$createDate" },
                    year: { $year: "$createDate" },
                    groupType: '$' + type
                },
                count: {$sum: 1}
            }
        },
        {
            $sort: {
                "_id": 1,
                type: 1
            }
        }
    ];
    //如果type字段是数组的话需要增加$unwind属性
    if(SCHEMA_OPTS[type].type === Array){
        var o_unwind = {$unwind: '$' + type};
        opts.unshift(o_unwind);
    }
    workFlowModel.aggregate(opts, function (err, result) {
        callback(err, result);
    });
}

WorkFlow.getDistinctByKey = function (key, conditions, callback) {
    workFlowModel.distinct(key, conditions).exec(function(err,result) {
        callback(err, result);
    })
}

WorkFlow.findAll = function(key, callback){
    workFlowModel.find(key).exec(function(err,result) {
        callback(err, result);
    })
}

module.exports = WorkFlow;