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
                method: 'GET',
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

        //注册或修改用户
        function signOrUpdateUser(user) {
            let deferred = $q.defer();
            $http({
                method: 'POST',
                url:appurl+'/User/insertOrUpdate',
                data:user
            }).then(function successCallback(response) {
                let data = response.data;
                deferred.resolve(data);
            }, function errorCallback(response) {
                let data = response.data;
                console.log(data);
                deferred.reject(data);
            });
            return deferred.promise;
        }

        //删除用户
        function deleteUserById(id) {
            let deferred = $q.defer();
            $http({
                method: 'GET',
                url:appurl+'/User/deleteById',
                params:{id:id}
            }).then(function successCallback(response) {
                let data = response.data;
                deferred.resolve(data);
            }, function errorCallback(response) {
                let data = response.data;
                console.log(data);
                deferred.reject(data);
            });
            return deferred.promise;
        }
        //重载数据
        function reLoadData () {
            let deferred = $q.defer();
            let resetPaging = true;
            vm.dtInstance.changeData(loadUsers(),resetPaging);
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
                '<button class="btn btn-danger" ng-click="userCtrl.delete(' + data.id + ')">' +
                '   <i class="fa fa-trash-o"></i>' +
                '</button>';
        }
        //编辑
        vm.edit = function (person) {
            // vm.dtInstance.reloadData();
            if(!person){
                person = {};
            }
            $scope.openUserModal('lg', person);
        };

        //删除
        vm.delete = function (id) {
            $q.when(deleteUserById(id)).then(function () {
                reLoadData ()
            });
        };

        //用户编辑模态框
        $scope.openUserModal = function (size, person) {
            let modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                resolve: {
                    user:function () {
                        return person;
                    }

                }
            });

            modalInstance.result.then(function (selectedItem) {
                console.log(selectedItem);
                //注册或修改用户
                signOrUpdateUser(selectedItem).then(reLoadData());

            }, function () {
                $log.info('模态框关闭于: ' + new Date());
                // vm.dtInstance.reloadData();
            });
        };

    }]);

//用户编辑模态框实例
app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'user', function($scope, $modalInstance,user) {
    $scope.user = user;

    $scope.ok = function () {
        $modalInstance.close($scope.user);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };


}])
;