define(['app'], function(app){
	app.controller('LoginController', ['$scope', '$location', function($scope, $location){
		$scope.loginData = {name: 'admin', password: 'admin'};
		$scope.userData = {name: '', password: ''};

		$scope.loginHandler = function(){
			if($scope.userData.name == $scope.loginData.name && $scope.userData.password == $scope.loginData.password){
				$location.path('/list/0');
			}else if($scope.userData.name != $scope.loginData.name){
				alert('请输入正确的账号！');
				return false;
			}else if($scope.userData.password != $scope.loginData.password){
				alert('请输入正确的密码！');
				return false;
			}
		};
	}]);
});