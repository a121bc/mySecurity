define(['angularAMD', 'angular-ui-router'], function (angularAMD) {
    let app = angular.module("webapp", ['ui.router']);
    app.config(function ($stateProvider, $urlRouterProvider,$rootScopeProvider) {

        $urlRouterProvider.otherwise("/index");
        $stateProvider
            .state("login",angularAMD.route({
                url:"/login",
                templateUrl:"./login/login.html",
                //controller:"LoginController",
                controllerUrl:"../js/login/login"
            }))
            .state("index",angularAMD.route({
                url:"/index",
                template:"<div>首页</div><div>{{title1}}</div>",
                controllerUrl:"../js/index"
            }));
    });
    return angularAMD.bootstrap(app);
});