app.controller('MenuController', function($q,$scope, $timeout,$http,toaster) {
    $scope.menu = {};
    $scope.my_tree_handler = function(branch) {
        /*let _ref;
        $scope.output = "You selected: " + branch.name;
        if ((_ref = branch.data) != null ? _ref.description : void 0) {
            return $scope.output += '(' + branch.data.description + ')';
        }*/
        $scope.menu = branch;

    };

    //加载资源
    $scope.loadMenus = function() {
        let deferred = $q.defer();
        $http({
            method: 'get',
            url:appurl+'/Menu/selectAllMenu'
        }).then(function successCallback(response) {
            let menu_list = response.data.list;
            deferred.resolve(menu_list);
        }, function errorCallback(response) {
            let data = response.data;
            toaster.pop('error', '', data.message);
        });

        return deferred.promise;
    };

    $scope.commit = function() {
        console.log($scope.menu);
    };


    $scope.my_data = [];
    $scope.doing_async = true;
    return $scope.loadMenus().then(function (list) {
        $scope.my_data = list;
        $scope.doing_async = false;
    });

});