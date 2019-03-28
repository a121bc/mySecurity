'use strict';

/* Controllers */

app
// Menu controller
    .controller('MenuController', ['$q','$scope', '$http', '$state', function($q,$scope,$http,$state) {
        $scope.loadMenus = function() {
            let deferred = $q.defer();
            $http({
                method: 'get',
                url:appurl+'/Menu/selectAll'
            }).then(function successCallback(response) {
                var data = response.data;
                $scope.menu_list = data.list;
                deferred.resolve(response);
            }, function errorCallback(response) {
                $state.go("access.signin");
                deferred.reject(response);
            });

            return deferred.promise;
        };
        $scope.loadMenus();



    }]);