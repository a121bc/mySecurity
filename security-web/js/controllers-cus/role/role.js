'use strict';

/* Controllers */

// 角色 controller
app.controller('RoleController',
    ['$q', '$scope', '$http', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTDefaultOptions', '$compile', '$modal', '$log','toaster',
        function($q,$scope,$http,DTOptionsBuilder,DTColumnBuilder,DTDefaultOptions,$compile,$modal,$log,toaster) {
            let vm = this;

            vm.roleList = [];
            vm.roles = {};
            vm.dtInstance = {};
            vm.msg ="角色管理";

            //加载角色列表
            function loadRoles() {
                let deferred = $q.defer();
                $http({
                    method: 'GET',
                    url:appurl+'/Role/selectAll'
                }).then(function successCallback(response) {
                    let data = response.data;
                    vm.roleList = data.list;
                    deferred.resolve(data.list);
                });
                return deferred.promise;
            }

            //注册或修改角色
            function signOrUpdateRole(role) {
                let deferred = $q.defer();
                $http({
                    method: 'POST',
                    url:appurl+'/Role/insertOrUpdate',
                    data:role
                }).then(function successCallback(response) {
                    let data = response.data;
                    toaster.pop(data.flag?'success':'error', '', data.message);
                    deferred.resolve(data);
                });
                return deferred.promise;
            }

            //删除角色
            function deleteRoleById(id) {
                let deferred = $q.defer();
                $http({
                    method: 'GET',
                    url:appurl+'/Role/deleteById',
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
                vm.dtInstance.changeData(loadRoles(),resetPaging);
                return deferred.promise;
            }

            //datatable表格构造
            DTDefaultOptions.setLanguageSource("js/controllers-cus/dataTablesLanguage.json");
            vm.dpOptions = DTOptionsBuilder
                .fromFnPromise(loadRoles())
                .withPaginationType('full_numbers')
                .withOption('createdRow', createdRow);
            function createdRow(row, data, dataIndex) {
                // Recompiling so we can bind Angular directive to the DT
                $compile(angular.element(row).contents())($scope);
            }

            vm.dtColumns = [
                DTColumnBuilder.newColumn('name').withTitle('角色名'),
                DTColumnBuilder.newColumn('namezh').withTitle('中文名'),
                DTColumnBuilder.newColumn('modifydate').withTitle('操作日期'),
                DTColumnBuilder.newColumn(null).withTitle('操作').notSortable()
                    .renderWith(actionsHtml)
            ];
            function actionsHtml(data, type, full, meta) {
                vm.roles[data.id] = data;
                return '<button class="btn btn-warning" ng-click="roleCtrl.edit(roleCtrl.roles[' + data.id + '])">' +
                    '   <i class="fa fa-edit"></i>' +
                    '</button>&nbsp;' +
                    '<button class="btn btn-danger" ng-click="roleCtrl.delete(' + data.id + ')" ng-if="'+data.id+' !=1">' +
                    '   <i class="fa fa-trash-o"></i>' +
                    '</button>';
            }
            //编辑
            vm.edit = function (role) {
                // vm.dtInstance.reloadData();
                if(!role){
                    role = {};
                }
                $scope.openRoleModal('lg', role);
            };

            //删除
            vm.delete = function (id) {
                $scope.deleteRoleModal('',id)
            };

            //角色编辑模态框
            $scope.openRoleModal = function (size, role) {
                let modalInstance = $modal.open({
                    templateUrl: 'roleContent.html',
                    controller: 'roleModalIsCtrl',
                    size: size,
                    resolve: {
                        role:function () {
                            return role;
                        }

                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    //注册或修改角色
                    $q.when(signOrUpdateRole(selectedItem))
                        .then(function () {
                            reLoadData();
                        });
                });
            };

            //角色删除模态框
            $scope.deleteRoleModal = function (size, id) {
                let modalInstance = $modal.open({
                    templateUrl: 'deleteRoleContent.html',
                    controller: 'deleteRoleModalIsCtrl',
                    size: size,
                    resolve: {
                        id:function () {
                            return id;
                        }

                    }
                });

                modalInstance.result.then(function (id) {
                    //注册或修改角色
                    $q.when(deleteRoleById(id)).then(function () {
                        reLoadData();
                    });
                });
            };

        }]);

//角色编辑模态框实例
app.controller('roleModalIsCtrl', ['$scope', '$modalInstance', 'role', function($scope, $modalInstance,role) {
    if(role && role.name && role.name.startsWith("ROLE_")){
        role.name = role.name.substr(5);
    }
    $scope.role = role;

    $scope.ok = function () {
        let name = $scope.role.name;
        if(!name.startsWith("ROLE_")){
            $scope.role.name = "ROLE_"+name;
        }

        $modalInstance.close($scope.role);
    };

    $scope.cancel = function () {
        console.log($scope.role)
        $modalInstance.dismiss('cancel');
    };


}]);
//角色删除模态框实例
app.controller('deleteRoleModalIsCtrl', ['$scope', '$modalInstance', 'id', function($scope, $modalInstance,id) {
    $scope.ok = function () {
        $modalInstance.close(id);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };


}]);