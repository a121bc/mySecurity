'use strict';

/* Controllers */

app
// Menu controller
    .controller('UserController',
    ['$q', '$scope', '$http', '$state', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTDefaultOptions', '$compile',
    function($q,$scope,$http,$state,DTOptionsBuilder,DTColumnBuilder,DTDefaultOptions,$compile) {
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
                // deferred.resolve([]);
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
            DTColumnBuilder.newColumn('sex').withTitle('性别'),
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
            console.log('You are trying to remove the row: ' + JSON.stringify(person));
            vm.dtInstance.reloadData();
        }

    }]);