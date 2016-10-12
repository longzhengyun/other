define(['app'], function(app) {
    return app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    	$urlRouterProvider.otherwise('/list/0');
        $stateProvider.state('list', {
            url: '/list/:id',//在id前面加一个冒号，从而制订了一个参数化URL
            views: {
				'aside': {
					templateUrl: 'views/aside.html',
					controller: 'AsideController'
				},
				'main': {
					templateUrl: 'views/main.html',
					controller: 'MainController'
				}
			}
        })
        .state('add', {
            url: '/add',
            views: {
				'add': {
					templateUrl: 'views/add.html',
					controller: 'AddController'
				}
			}
        })
        .state('detail', {
            url: '/detail/:id',//在id前面加一个冒号，从而制订了一个参数化URL
            views: {
				'detail': {
					templateUrl: 'views/detail.html',
					controller: 'DetailController'
				}
			}
        })
        .state('login', {
            url: '/login',
            views: {
				'login': {
					templateUrl: 'views/login.html',
					controller: 'LoginController'
				}
			}
        });
    }])
});