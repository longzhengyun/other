//定义app
var app = angular.module('app', ['ngSanitize', 'ui.router', 'ui.select']);

//常数
app.constant('HTMLFILES_URL', 'data/prototypefiles.php');
app.constant('HTMLDATA_URL', 'data/prototypedata.json?' + new Date().getTime());
app.constant('ENTER_DATA', 'data/enterdata.json');
app.constant('PROJECT_URL', 'http://hfdoc.qa.nt.ctripcorp.com/docmapp/getProjects');
app.constant('BRANCH_URL', 'http://hfdoc.qa.nt.ctripcorp.com/docmapp/getBranches/');

//路由
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/list');
    $stateProvider.state('list', {
        url: '/list?dir=',
        views: {
            'main': {
                templateUrl: 'views/main.html',
                controller: 'mainController'
            },
            'content@list': {
                templateUrl: 'views/content.html',
                controller: 'contentController'
            }
        }
    });
}])

//控制器
app.controller('mainController', ['$scope', '$location', '$state', 'dataService', 'HTMLDATA_URL', 'ENTER_DATA', 'PROJECT_URL', 'BRANCH_URL', function($scope, $location, $state, dataService, HTMLDATA_URL, ENTER_DATA, PROJECT_URL, BRANCH_URL) {
    //设置原型数据为空
    $scope.basicData = {};

    //当前目录
    var searchDir = $location.search().dir;
    if(searchDir == undefined){
        $scope.dirSelect = '请选择原型目录';
    }else{
        $scope.dirSelect = decodeURIComponent(searchDir);
    };

    //获取快捷入口数据
    dataService.getData(ENTER_DATA).success(function(data) {
        $scope.enterData = data;
    });

    //设置默认为本地数据
    $scope.localData = true;

    //设置默认列表数据
    $scope.listData = {
        prototypeData: [],
        userBranch: 'release'
    };

    //获取all files数据
    dataService.getData(HTMLDATA_URL).success(function(data) {
        //原型 data
        $scope.basicData.data = data;

        //目录列表
        $scope.basicData.dirList = [], hash = {};
        $scope.basicData.dirList.selected = $scope.dirSelect;

        angular.forEach($scope.basicData.data, function(value){
            //数组去重
            if(!hash[value.dir]){
                $scope.basicData.dirList.push(value.dir);
                hash[value.dir] = true;
            };
            //list数据
            if(value.dir.indexOf($scope.dirSelect) >= 0){
                $scope.listData.prototypeData.push(value);
            };
        });

        //通知列表更新视图
        $scope.$broadcast('listView', $scope.listData);
    });

    //判断是否为服务器数据
    var host = $location.host();
    if(host == 'hfdoc.qa.nt.ctripcorp.com'){
        //获取项目数据
        dataService.getData(PROJECT_URL).success(function(data) {
            var keyArray = [];

            angular.forEach(data.allRemotes, function(value, key){
                keyArray.push(key);
            });

            $scope.userProjects = keyArray;

            //设置为非本地目录
            $scope.localData = false;

            //设置默认分支
            $scope.userBranchs = ['release'];
            $scope.userBranchs.selected = 'release';

            $scope.listData.userBranch = $scope.userBranchs.selected;
        });
    };

    //设置url参数
    $scope.loadDir = function(dir) {
        $state.go('list', {'dir': dir});//跳转到选中目录
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

app.controller('contentController', ['$scope', function($scope) {
    //更新列表视图
    $scope.$on('listView', function (e, data) {
        $scope.prototypeData = data.prototypeData;
        $scope.userBranch = data.userBranch;
    })
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

//指令
app.directive('domDirective', ['$window', '$timeout', '$state', 'dataService', 'HTMLFILES_URL', 'HTMLDATA_URL', function($window, $timeout, $state, dataService, HTMLFILES_URL, HTMLDATA_URL) {
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

                //判断上次更新时间是否超过8小时，是 则自动更新
                dataService.getData(HTMLDATA_URL).success(function(data) {
                    angular.forEach(data, function(value){
                        if(value.updateTime){
                            var now = new Date().getTime() / 1000;//时间戳 毫秒转秒
                            if((now - value.updateTime) >= 28800000){
                                //更新all files数据
                                dataService.getData(HTMLFILES_URL).success(function() {
                                    console.log('自动更新数据成功！');
                                });
                            };
                        };
                    });
                });

                //点击更新
                htmlFilesBox.onclick = function(){
                    //删除按钮
                    document.body.removeChild(htmlFilesBox);

                    //显示提示信息
                    var hintModule = document.createElement('div');
                        hintModule.className = 'hint-module';
                        hintModule.innerHTML = '更新中，请稍候！';
                        document.body.appendChild(hintModule);

                    //生成all files数据
                    dataService.getData(HTMLFILES_URL).success(function() {
                        //显示提示信息
                        hintModule.innerHTML = '更新数据成功！';

                        //重新渲染页面
                        $timeout(function(){
                            $state.go($state.$current, null, { reload: true });
                            document.body.removeChild(hintModule); //删除节点
                        }, 1000);
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