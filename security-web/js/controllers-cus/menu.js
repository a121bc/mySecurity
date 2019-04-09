'use strict';

/* Controllers */

app
// Menu controller
    .controller('MenuShowController', ['$q','$scope', '$http', function($q,$scope,$http,) {
        $scope.loadMenus = function() {
            let deferred = $q.defer();
            $http({
                method: 'get',
                url:appurl+'/Menu/selectAll'
            }).then(function successCallback(response) {
                var data = response.data;
                $scope.menu_list = data.list;
                deferred.resolve(response);
            });

            return deferred.promise;
        };
        return $scope.loadMenus();



    }]);