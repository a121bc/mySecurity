'use strict';

/* Controllers */

// 角色 controller
app.controller('RoleController',
    ['$q', '$scope', '$http', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTDefaultOptions', '$compile', '$modal',
        function($q,$scope,$http,DTOptionsBuilder,DTColumnBuilder,DTDefaultOptions,$compile,$modal) {
            let vm = this;

            vm.roleList = [];
            vm.menuList = [];
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
                    vm.menuList = data.menuList;
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
                    deferred.resolve(data);
                });
                return deferred.promise;
            }

            //修改角色菜单权限
            function insertMenuRoles(roleCustom) {
                let deferred = $q.defer();
                $http({
                    method: 'POST',
                    url:appurl+'/MenuRole/insertMenuRoles',
                    data:roleCustom
                }).then(function successCallback(response) {
                    let data = response.data;
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
                    deferred.resolve(data);
                });
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
                return '<nobr><button title="编辑" class="btn btn-warning" ng-click="roleCtrl.edit(roleCtrl.roles[' + data.id + '])">' +
                    '   <i class="fa fa-edit"></i>' +
                    '</button>&nbsp;' +
                    '<button title="管理菜单" class="btn btn-info" ng-click="roleCtrl.selectMenu(roleCtrl.roles[' + data.id + '])" >' +
                    '   <i class="fa fa-list-ol"></i>' +
                    '</button>&nbsp;'+
                    '<button title="删除" class="btn btn-danger" ng-click="roleCtrl.delete(' + data.id + ')" ng-if="'+data.id+' !=1">' +
                    '   <i class="fa fa-trash-o"></i>' +
                    '</button></nobr>';
            }
            //编辑
            vm.edit = function (role) {
                if(!role){
                    role = {};
                }
                openRoleModal('lg', role);
            };

            //管理菜单
            vm.selectMenu = function(role) {
                openRoleMenuModal('', role,vm.menuList)
            };

            //删除
            vm.delete = function (id) {
                deleteRoleModal('',id);
            };

            //角色编辑模态框
            function openRoleModal(size, role) {
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
                        .then(function (data) {
                            let deferred = $q.defer();
                            if(data.obj) {
                                vm.roleList.push(data.obj);
                            }else {
                                vm.roleList = updateData(selectedItem,vm.roleList)
                            }
                            deferred.resolve(vm.roleList);
                            vm.dtInstance.changeData(deferred.promise);
                            return deferred.promise;
                        });
                });
                //更新数据
                function updateData(obj,list){
                    for(let i=0;i<list.length;i++) {
                        if(list[i].id === obj.id){
                            list[i] = obj;
                            break;
                        }
                    }
                    return list;
                }
            }

            //角色删除模态框
             function deleteRoleModal(size, id) {
                let modalInstance = $modal.open({
                    templateUrl: 'deleteModal.html',
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
                        vm.dtInstance.changeData(deleteData(id,vm.roleList));
                    });
                });
                //删除数据
                function deleteData(id,list){
                    let deferred = $q.defer();
                    for(let i=0;i<list.length;i++) {
                        if(list[i].id === id){
                            list.splice(i,1);
                            deferred.resolve(list);
                            return deferred.promise;
                        }
                    }
                    console.log("error");
                    return deferred.promise;
                }
            }

            //菜单模态框
            function openRoleMenuModal(size, role,menuList) {
                let modalInstance = $modal.open({
                    templateUrl: 'roleMenuContent.html',
                    controller: 'roleMenuCtrl',
                    size: size,
                    resolve: {
                        mids:function () {
                            return role.mids;
                        },
                        menuList:function () {
                            return menuList;
                        }
                    }
                });

                modalInstance.result.then(function (mids) {
                    //修改角色菜单权限
                    // console.log(role.id);
                    // console.log(mids);
                    let roleCustom ={
                        id:role.id,
                        mids:mids
                    };
                    $q.when(insertMenuRoles(roleCustom)).then(function (data) {
                        let deferred = $q.defer();
                        if(data && data.flag) {
                            role.mids = mids;
                        }
                        deferred.resolve(data);
                    });

                });

            }

        }]);

//角色编辑模态框实例
app.controller('roleModalIsCtrl', ['$scope', '$modalInstance', 'role', function($scope, $modalInstance,role) {
    if(role && role.name && role.name.startsWith("ROLE_")){
        role.name = role.name.substr(5);
    }
    $scope.role = angular.copy(role);

    $scope.ok = function () {
        let name = $scope.role.name;
        if(!name.startsWith("ROLE_")){
            $scope.role.name = "ROLE_"+name;
        }

        $modalInstance.close($scope.role);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };


}]);
//角色删除模态框实例
app.controller('deleteRoleModalIsCtrl', ['$scope', '$modalInstance', 'id', function($scope, $modalInstance,id) {
    $scope.msg = '请确认是否删除该角色？';
    $scope.ok = function () {
        $modalInstance.close(id);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };


}]);

//用户角色编辑模态框实例
app.controller('roleMenuCtrl', function($scope, $modalInstance,mids,menuList) {
    let tree;
    let menu_ids = mids;

    function travTree(mList) {
        for(let i=0;i<mList.length;i++) {
            mList[i].choose = menu_ids.includes(mList[i].id);
            if(mList[i].children.length>0){
                travTree(mList[i].children);
            }
        }
    }
    travTree(menuList);

    $scope.menuList = angular.copy(menuList);
    //初始化载入数据
    $scope.my_tree = tree = {};
    $scope.doing_async = true;
    $scope.my_data = menuList;
    $scope.doing_async = false;

    //确认
    $scope.ok = function () {
        let menuArr = tree.get_tree_rows();
        let mids = menuArr.filter(e => e.branch.choose == true).map(e => e.branch.id);
        $modalInstance.close(mids);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };


});