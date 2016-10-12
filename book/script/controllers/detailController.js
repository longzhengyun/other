define(['app'], function(app){
	app.controller('DetailController', ['$scope', '$location', function($scope, $location){
		$scope.detailData = [
			{order: '1', name: '用AngularJS开发下一代计算机应用', author: '大漠穷秋', date: '2014-01-01', pirce: '34.00', pic: 'images/book.jpg', press: '计算机出版社', type: '计算机', ebook: '有'},
			{order: '2', name: '用AngularJS开发下一代金融应用', author: '大秋', date: '2013-01-02', pirce: '43.00', pic: 'images/book.jpg', press: '金融出版社', type: '金融', ebook: '无'},
			{order: '3', name: '用AngularJS开发下一代哲学应用', author: '漠穷', date: '2012-01-03', pirce: '52.00', pic: 'images/book.jpg', press: '哲学出版社', type: '哲学', ebook: '有'},
			{order: '4', name: '用AngularJS开发下一代高端办公应用', author: '穷秋', date: '2011-01-04', pirce: '61.00', pic: 'images/book.jpg', press: '高端办公出版社', type: '高端办公', ebook: '无'}
		];

		$scope.detailId = $location.url().substr(8);
	}]);
});