//定义app
var app = angular.module('app', ['ngSanitize', 'ui.select']);

//常数
app.constant('HTMLFILES_URL', 'data/prototypefiles.php');
app.constant('HTMLDATA_URL', 'data/prototypedata.json?' + new Date().getTime());
app.constant('ENTER_DATA', 'data/enterdata.json');
app.constant('PROJECT_URL', 'http://hfdoc.qa.nt.ctripcorp.com/docmapp/getProjects');
app.constant('BRANCH_URL', 'http://hfdoc.qa.nt.ctripcorp.com/docmapp/getBranches/');

//控制器
app.controller('mainController', ['$scope', '$location', 'dataService', 'HTMLDATA_URL', 'ENTER_DATA', 'PROJECT_URL', 'BRANCH_URL', function($scope, $location, dataService, HTMLDATA_URL, ENTER_DATA, PROJECT_URL, BRANCH_URL) {
    //设置加载提示状态
    $scope.hintState = false;

    //获取快捷入口数据
    dataService.getData(ENTER_DATA).success(function(data) {
        $scope.enterData = data;
    });

    //判断是否为本地目录
    var host = $location.host();
    if(host == 'hfdoc.qa.lc.ctripcorp.com'){
        $scope.localData = true;
    }else if(host == 'hfdoc.qa.nt.ctripcorp.com'){
        $scope.localData = false;

        //获取项目数据
        dataService.getData(PROJECT_URL).success(function(data) {
            var keyArray = [];
            angular.forEach(data.allRemotes, function(value, key){
                keyArray.push(key);
            });
            $scope.userProjects = keyArray;
        });

        //设置默认分支
        $scope.userBranchs = ['release'];
        $scope.userBranchs.selected = 'release';
    };

    //获取URL参数
    $scope.getUrlData = function(key){
        var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)');
        var urlData = window.location.search.substr(1).match(reg);
        
        if(urlData != null){
            return unescape(urlData[2]);
        }else{
            return null;
        };
    };

    //获取all files数据
    dataService.getData(HTMLDATA_URL).success(function(data) {
        $scope.htmlFilesData = data;

        //目录列表
        $scope.dirList = [];
        var hash = {};
        angular.forEach(data, function(value){
            if(!hash[value.dir]){//数组去重
                $scope.dirList.push(value.dir);
                hash[value.dir] = true;
            }
        });

        //检测URL是否包含参数dir 如果带参数 则加载对应数据
        var dirData = $scope.getUrlData('dir');
        if(dirData){
            $scope.dirList.selected = dirData;

            //按目录加载数据
            $scope.loadData();
        };
    });

    //按目录加载数据
    $scope.loadData = function(){
        $scope.prototypeData = [];
        angular.forEach($scope.htmlFilesData, function(value){
            if(value.dir.indexOf($scope.dirList.selected) >= 0){
                $scope.prototypeData.push(value);
            };
        });
    };

    //设置url参数
    $scope.loadDir = function(dir) {
        //获取选中目录
        $scope.dirList.selected = dir;

        //设置url参数
        window.location.search = '?dir=' + $scope.dirList.selected;
    };

    //加载分支数据
    $scope.loadBranch = function(id){
        //获取项目数据
        dataService.getData(BRANCH_URL + id).success(function(data) {
            $scope.userBranchs = data.remoteData.banches;
            angular.forEach(data.remoteData.banches, function(value){
                if(value == 'release'){
                    $scope.userBranchs.selected = value;
                };
            });
        });
    };

    //键盘事件-回车提交
    $scope.myKeyup = function(e, v, handler) {
        var keycode = window.event ? e.keyCode : e.which;
        if (keycode == 13) {
            handler(v);//执行方法
        };
    };
}]);

//服务
app.factory('dataService', ['$http', function($http) {
    return {
        //获取数据
        getData: function(url) {
            return $http.get(url);
        }
    }
}]);

app.factory('localService', ['$window', function($window) {
    return {
        //存储对象，以JSON格式存储
        setLocalData: function(key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        //读取对象
        getLocalData: function(key) {
            return JSON.parse($window.localStorage[key] || '{}');
        }
    }
}])

//指令
app.directive('domDirective', ['$window', '$timeout', 'dataService', 'localService', 'HTMLFILES_URL', 'HTMLDATA_URL', function($window, $timeout, dataService, localService, HTMLFILES_URL, HTMLDATA_URL) {
    return {
        restrict: 'AE',
        link: function(scope, element, attrs) {
            //返回顶部
            scope.backTop = {
                init: function(){
                    var backTopBox = document.createElement('div');
                    backTopBox.className = 'back-top';

                    backTopBox.onclick = function(){
                        scope.backTop.handler();
                    };

                    return document.body.appendChild(backTopBox);
                },
                scorll: function(){
                    var oTop = document.body.scrollTop;
                    var backTopBox = document.querySelector('.back-top');
                    if(oTop < 300){
                        backTopBox.style = 'opacity:0';
                    }else{
                        backTopBox.style = 'opacity:1';
                    };
                },
                handler: function(){
                    timer = setInterval(function(){
                        var oTop = document.body.scrollTop;
                        var iSpeed = Math.floor(-oTop / 10);
                        document.body.scrollTop = oTop + iSpeed;
                        if(oTop == 0){
                            clearInterval(timer);
                        };
                    }, 30);
                }
            };

            //更新html files数据
            scope.htmlFilesData = function(){
                var htmlFilesBox = document.createElement('div');
                htmlFilesBox.className = 'html-files';

                //获取本地数据
                var localData = localService.getLocalData('updateData');
                var now = new Date().getTime();

                //根据本地缓存获取更新时间，间隔超过28800000毫秒（8小时），即自动更新
                if((now - localData.date) < 28800000){}else{
                    localData.date = now;
                    localService.setLocalData('updateData', localData); //本地存储数据

                    //更新all files数据
                    dataService.getData(HTMLFILES_URL).success(function() {
                        console.log('自动更新数据成功！');
                    });
                };

                //点击更新
                htmlFilesBox.onclick = function(){
                    //删除按钮
                    document.body.removeChild(htmlFilesBox);

                    //显示提示信息
                    scope.hintState = true;
                    scope.hintText = '更新中，请稍后！';

                    //生成all files数据
                    dataService.getData(HTMLFILES_URL).success(function() {
                        //更新本地数据
                        now = new Date().getTime();
                        localData.date = now;
                        localService.setLocalData('updateData', localData); //本地存储数据

                        //显示提示信息
                        scope.hintText = '更新数据成功！';

                        //获取all files数据
                        dataService.getData(HTMLDATA_URL).success(function(data) {
                            scope.htmlFilesData = data;

                            //目录列表
                            scope.dirList = [];
                            var hash = {};
                            angular.forEach(data, function(value){
                                if(!hash[value.dir]){//数组去重
                                    scope.dirList.push(value.dir);
                                    hash[value.dir] = true;
                                }
                            });

                            $timeout(function(){
                                scope.hintState = false;
                            }, 1000);
                        });
                    });
                };

                return document.body.appendChild(htmlFilesBox);
            };

            $window.onload = function() {
                scope.backTop.init();//回到顶部
                scope.htmlFilesData();//更新html files数据
            };
            $window.onscroll = function(){
                scope.backTop.scorll();//回到顶部
            };
        }
    }
}])