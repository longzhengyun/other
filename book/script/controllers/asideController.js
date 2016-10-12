define(['app'], function(app){
	app.controller('AsideController', ['$scope', '$location', function($scope, $location){
		$scope.menuData = {
			title: '书籍类型',
			option: ['全部', '计算机', '金融', '哲学', '高端办公']
		};

		$scope.menuId = $location.url().substr(6);

		$scope.setStyle = function(args){
			if(args == $scope.menuId){
				return 'cur';
			}
		};
	}]);
});