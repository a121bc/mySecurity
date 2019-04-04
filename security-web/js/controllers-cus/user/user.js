'use strict';

/* Controllers */

// Menu controller
app.controller('UserController',
    ['$q', '$scope', '$http', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTDefaultOptions', '$compile', '$modal', '$log',
    function($q,$scope,$http,DTOptionsBuilder,DTColumnBuilder,DTDefaultOptions,$compile,$modal,$log) {
        let vm = this;

        vm.userList = [];
        vm.persons = {};
        vm.dtInstance = {};

        //加载用户列表
        function loadUsers() {
            let deferred = $q.defer();
            $http({
                method: 'get',
                url:appurl+'/User/selectAll'
            }).then(function successCallback(response) {
                let data = response.data;
                vm.userList = data.list;
                deferred.resolve(data.list);
            }, function errorCallback(response) {
                let data = response.data;
                if(data.error=="access_denied"){
                    console.log(data.error_description);
                }
                deferred.reject(data);
            });
            return deferred.promise;
        }

        DTDefaultOptions.setLanguageSource("js/controllers-cus/dataTablesLanguage.json");
        vm.dpOptions = DTOptionsBuilder
            .fromFnPromise(loadUsers())
            .withPaginationType('full_numbers')
            .withOption('createdRow', createdRow);
        function createdRow(row, data, dataIndex) {
            // Recompiling so we can bind Angular directive to the DT
            $compile(angular.element(row).contents())($scope);
        }

        vm.dtColumns = [
            DTColumnBuilder.newColumn('name').withTitle('姓名'),
            DTColumnBuilder.newColumn('sex').withTitle('性别').renderWith(function(data, type, full) {
                return data==1?"男":"女";
            }),
            DTColumnBuilder.newColumn('phone').withTitle('手机号'),
            DTColumnBuilder.newColumn('username').withTitle('账号'),
            DTColumnBuilder.newColumn('modifydate').withTitle('操作日期'),
            DTColumnBuilder.newColumn(null).withTitle('操作').notSortable()
                .renderWith(actionsHtml)
        ];
        function actionsHtml(data, type, full, meta) {
            vm.persons[data.id] = data;
            return '<button class="btn btn-warning" ng-click="userCtrl.edit(userCtrl.persons[' + data.id + '])">' +
                '   <i class="fa fa-edit"></i>' +
                '</button>&nbsp;' +
                '<button class="btn btn-danger" ng-click="userCtrl.delete(userCtrl.persons[' + data.id + '])" )">' +
                '   <i class="fa fa-trash-o"></i>' +
                '</button>';
        }
        //编辑
        vm.edit = function (person) {
            // $log.info('You are trying to remove the row: ' + JSON.stringify(person));
            // vm.dtInstance.reloadData();
            $scope.open('lg', person);
        };

        $scope.items = ['item1', 'item2', 'item3'];
        $scope.open = function (size, person) {
            let modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    },
                    user:function () {
                        return person;
                    }

                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

    }]);

//模态框实例
app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'items', 'user', function($scope, $modalInstance, items,user) {
    $scope.items = items;
    $scope.user = user;

    // $scope.sex_option = {0:'女',1:'男'};
    // $scope.enabled_option = {0:'否',1:'是'};
    // $scope.locked_option = {false:'否',true:'是'};

    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
        console.log($scope.user);

    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };


}])
;