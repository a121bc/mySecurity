define(['app'], function () {
    'use strict';
    return ['$scope','$rootScope', function ($scope,$rootScope) {
        $scope.title1=$rootScope.title;
    }];
});