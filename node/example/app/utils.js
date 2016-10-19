var moment = require('moment'),
    util = {};

util.formatDatas = function(collection){
    for(var i= 0; i< collection.length; i++){
        var item = collection[i];
        item._doc.submitDate = moment(item.submitDate).format('YYYY/MM/DD hh:mm a');//文档提交时间
        item._doc.submitTime = moment(item.submitTime).format('YYYY/MM/DD hh:mm a');//项目提交时间
        item._doc.createDate = moment(item.createDate).format('YYYY/MM/DD hh:mm a');//创建时间
    }
    return collection;
}

util.formatData = function(model){
    if(model){
        model._doc.submitDate = moment(model.submitDate).format('YYYY/MM/DD hh:mm a');//文档提交时间
        model._doc.submitTime = moment(model.submitTime).format('YYYY/MM/DD hh:mm a');//项目提交时间
        model._doc.createDate = moment(model.createDate).format('YYYY/MM/DD hh:mm a');//创建时间
        return model;
    }
}

//列出时间范围内所有的YYYY-MM
util.listYearMonth = function(startDate, endDate){
    var list = [],
        currentDate = startDate;
    while(currentDate < endDate){
        currentDate = moment(currentDate).startOf('month');
        list.push(currentDate.format("YYYY-MM"));
        currentDate.add(1, 'months');
    }
    return list;
}

util.listYearMonth();
module.exports = util;