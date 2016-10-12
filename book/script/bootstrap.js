define(['require', 'angular', 'app', 'routes', 'controllers/asideController', 'controllers/mainController', 'controllers/detailController', 'controllers/addController', 'controllers/loginController'], function (require, angular) {
    require(['domReady!'], function (document) {
        angular.bootstrap(document, ['app']);
    });
});