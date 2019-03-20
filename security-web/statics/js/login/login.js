
/*
define(['app'], function (app) {
    debugger;
    app.controller('LoginController', function ($scope) {
        //$scope.msgs = ['富强','民主','文明','和谐','自由','平等','公正','法治'];
        console.log(123);
        $scope.message = "hello";
    });
});*/
define(['app'], function () {
    'use strict';
    return ['$scope','$rootScope', function ($scope,$rootScope) {
        $scope.message = 'Welcome to Home Page';
        $scope.msgs = ['富强','民主','文明','和谐','自由','平等','公正','法治'];
        $rootScope.title = $scope.message;
    }];
});