'use strict';

/* Controllers */

// 用户 controller
app.controller('UserController',
    ['$q', '$scope', '$http', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTDefaultOptions', '$compile', '$modal',
    function($q,$scope,$http,DTOptionsBuilder,DTColumnBuilder,DTDefaultOptions,$compile,$modal) {
        let vm = this;

        vm.userList = [];
        vm.roleList = [];
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
                vm.roleList = data.roleList;
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
                deferred.resolve(data);
            });
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
            return '<nobr> <button title="编辑" class="btn btn-warning" ng-click="userCtrl.edit(userCtrl.persons[' + data.id + '])">' +
                '   <i class="fa fa-edit"></i>' +
                '</button>&nbsp;' +
                '<button title="管理角色" class="btn btn-info" ng-click="userCtrl.selectRole(userCtrl.persons[' + data.id + '])" >' +
                '   <i class="fa fa-mortar-board"></i>' +
                '</button>&nbsp;'+
                '<button title="删除" class="btn btn-danger" ng-click="userCtrl.delete(' + data.id + ')" ng-if="'+data.id+' !=1">' +
                '   <i class="fa fa-trash-o"></i>' +
                '</button> </nobr>';
        }
        //编辑
        vm.edit = function (person) {
            // vm.dtInstance.reloadData();
            if(!person){
                person = {};
            }
            openUserModal('lg', person);
        };

        //查询角色
        vm.selectRole = function(person) {

            openUserRoleModal('',person,vm.roleList);
        };

        //删除
        vm.delete = function (id) {
            deleteUserModal('',id);
        };

        //角色模态框
        function openUserRoleModal(size, person,roleList) {
            let modalInstance = $modal.open({
                templateUrl: 'userRoleContent.html',
                controller: 'userRoleCtrl',
                size: size,
                resolve: {
                    rids:function () {
                        return person.rids;
                    },
                    roleList:function () {
                        return roleList;
                    }
                }
            });

            modalInstance.result.then(function (rids) {

                let deferred = $q.defer();
                $http({
                    method: 'POST',
                    url:appurl+'/User/insertUserRole',
                    data:{
                        uid:person.id,
                        rids:rids
                    }
                }).then(function successCallback(response) {
                    let data = response.data;
                    if(data.flag) {
                        person.rids = rids;
                    }
                    deferred.resolve(data);
                });
                return deferred.promise;

            });

        }

        //用户编辑模态框
        function openUserModal(size, person) {
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
                .then(function (data) {
                    let deferred = $q.defer();
                    if(data.obj) {
                        vm.userList.push(data.obj);
                    }else {
                        vm.userList = updateData(selectedItem,vm.userList)
                    }
                    deferred.resolve(vm.userList);
                    vm.dtInstance.changeData(deferred.promise);
                    return deferred.promise;
                });
            });
            //更新集合
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

        //用户删除模态框
         function deleteUserModal(size, id) {
            let modalInstance = $modal.open({
                templateUrl: 'deleteModal.html',
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
                $q.when(deleteUserById(id))
                    .then(function () {
                        vm.dtInstance.changeData(deleteData(id,vm.userList));
                });
            });
            //删除数据
            function deleteData(id,list){
                let deferred = $q.defer();
                for(let i=0;i<list.length;i++) {
                    if(list[i].id === id){
                        list.splice(i,1);
                        deferred.resolve(list);
                        break;
                    }
                }
                return deferred.promise;
            }
        }

    }]);

//用户编辑模态框实例
app.controller('userModalIsCtrl', function($scope, $modalInstance,user) {
    $scope.user = angular.copy(user);

    $scope.ok = function () {
        $modalInstance.close($scope.user);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };


});
//用户角色编辑模态框实例
app.controller('userRoleCtrl', function($scope, $modalInstance,rids,roleList) {
    // $scope.roles = angular.copy(roles);
    // $scope.roleList = angular.copy(roleList);
    let role_ids = rids;

    angular.forEach(roleList,function (e,i,arr) {
        e.choose = role_ids.includes(e.id);
    });
    $scope.roleList = angular.copy(roleList);



    $scope.ok = function () {
        let rids = $scope.roleList.filter(e => e.choose===true).map(e => e.id);
        $modalInstance.close(rids);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };


});
//用户删除模态框实例
app.controller('deleteUserModalIsCtrl', function($scope, $modalInstance,id) {
    $scope.msg = '请确认是否删除该用户？';

    $scope.ok = function () {
        $modalInstance.close(id);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };


});