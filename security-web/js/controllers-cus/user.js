'use strict';

/* Controllers */

app
// Menu controller
    .controller('UserController', ['$scope', '$http', '$state', function($scope,$http,$state) {
        /*$http({
            method: 'get',
            url:appurl+'/Menu/selectAll'
        }).then(function successCallback(response) {
            var data = response.data;
            $scope.menu_list = data.list;
        }, function errorCallback(response) {
            $state.go("access.signin");

        });*/
        $scope.user="";
    }]);