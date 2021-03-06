// config

var app =  
angular.module('app')
  .config(
    [        '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ($controllerProvider,   $compileProvider,   $filterProvider,   $provide) {
        
        // lazy controller, directive and service
        app.controller = $controllerProvider.register;
        app.directive  = $compileProvider.directive;
        app.filter     = $filterProvider.register;
        app.factory    = $provide.factory;
        app.service    = $provide.service;
        app.constant   = $provide.constant;
        app.value      = $provide.value;
    }
  ]);

app.factory('AuthInterceptor', ['$q','$localStorage', '$injector',function($q,$localStorage,$injector) {
    return {
        // Send the Authorization header with each request
        'request': function(config) {

            let url = config.url;
            //请求通用配置（添加token）
            if(url.indexOf("oauth/token") !== -1){
                config.headers = config.headers || {};
                var encodedString = btoa("my-trusted-client:secret");
                config.headers.Authorization = 'Basic '+encodedString;
            }else if($localStorage.token){
                config.headers.Authorization = 'Bearer '+$localStorage.token.access_token;
                config.headers['Content-Type'] = "application/json;charset=UTF-8";
            }

            return config;
        },
        response: function (response) {
            if(response.data.list){
                let toaster = $injector.get('toaster');
                toaster.pop('info', '', response.data.message);
            }else if (response.data.flag) {
                let toaster = $injector.get('toaster');
                toaster.pop('success', '', response.data.message);
            }

            return response || $q.when(response);
        },
        responseError: function(rejection) {
            if (rejection.status === 401) {
                let stateService = $injector.get('$state');
                stateService.go("access.signin");
            }else if (rejection.status === 403) {
                let stateService = $injector.get('$state');
                stateService.go("app");
                let toaster = $injector.get('toaster');
                toaster.pop('error', '', rejection.data.error_description);
            }
            return $q.reject(rejection);
        }
    };
}]);

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
}]);