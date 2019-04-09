'use strict';

/* Controllers */

// 用户 controller
app.controller('UserController',
    ['$q', '$scope', '$http', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTDefaultOptions', '$compile', '$modal', '$log','toaster',
    function($q,$scope,$http,DTOptionsBuilder,DTColumnBuilder,DTDefaultOptions,$compile,$modal,$log,toaster) {
        let vm = this;

        vm.userList = [];
        vm.persons = {};
        vm.dtInstance = {};
        vm.msg ="用户管理";

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
                toaster.pop(data.flag?'success':'error', '', data.message);
                deferred.resolve(data);
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
                toaster.pop(data.flag?'success':'error', '', data.message);
                deferred.resolve(data);
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

        //datatable表格构造
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
                '<button class="btn btn-danger" ng-click="userCtrl.delete(' + data.id + ')" ng-if="'+data.id+' !=1">' +
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
            $scope.deleteUserModal('',id)
        };

        //用户编辑模态框
        $scope.openUserModal = function (size, person) {
            let modalInstance = $modal.open({
                templateUrl: 'userContent.html',
                controller: 'userModalIsCtrl',
                size: size,
                resolve: {
                    user:function () {
                        return person;
                    }

                }
            });

            modalInstance.result.then(function (selectedItem) {
                //注册或修改用户
                $q.when(signOrUpdateUser(selectedItem))
                .then(function () {
                    reLoadData();
                });
            });
        };

        //用户删除模态框
        $scope.deleteUserModal = function (size, id) {
            let modalInstance = $modal.open({
                templateUrl: 'deleteUserContent.html',
                controller: 'deleteUserModalIsCtrl',
                size: size,
                resolve: {
                    id:function () {
                        return id;
                    }

                }
            });

            modalInstance.result.then(function (id) {
                //注册或修改用户
                $q.when(deleteUserById(id)).then(function () {
                    reLoadData();
                });
            });
        };

    }]);

//用户编辑模态框实例
app.controller('userModalIsCtrl', ['$scope', '$modalInstance', 'user', function($scope, $modalInstance,user) {
    $scope.user = user;

    $scope.ok = function () {
        $modalInstance.close($scope.user);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };


}]);
//用户删除模态框实例
app.controller('deleteUserModalIsCtrl', ['$scope', '$modalInstance', 'id', function($scope, $modalInstance,id) {
    $scope.msg = '请确认是否删除该用户？';

    $scope.ok = function () {
        $modalInstance.close(id);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };


}]);