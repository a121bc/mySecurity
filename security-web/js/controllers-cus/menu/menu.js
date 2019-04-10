app.controller('MenuController', function($q,$scope, $timeout,$http,toaster,$modal) {
    let tree;
    $scope.menu = null;
    $scope.my_tree_handler = function(branch) {
        /*let _ref;
        $scope.output = "You selected: " + branch.name;
        if ((_ref = branch.data) != null ? _ref.description : void 0) {
            return $scope.output += '(' + branch.data.description + ')';
        }*/
        $scope.menu = angular.copy(branch);

    };

    //加载资源
    $scope.selectMenus = function() {
        let deferred = $q.defer();
        $http({
            method: 'get',
            url:appurl+'/Menu/selectAllMenu'
        }).then(function successCallback(response) {
            let menu_list = response.data.list;
            deferred.resolve(menu_list);
        });

        return deferred.promise;
    };

    //添加或修改菜单
    function insertOrUpdateMenu(menu) {
        let deferred = $q.defer();
        $http({
            method: 'POST',
            url:appurl+'/Menu/insertOrUpdate',
            data:menu
        }).then(function successCallback(response) {
            let data = response.data;
            deferred.resolve(data);
        });
        return deferred.promise;
    }

    //提交
    $scope.commit = function() {
        let menu = $scope.menu;
        insertOrUpdateMenu(menu)
            .then(function (data) {
                // loadMenuData();
                let b = tree.get_selected_branch();
                if(data.obj) { //新增
                    menu = data.obj;
                    if(menu.parentid !== b.id){//添加根节点
                        b=null;
                    }
                    tree.add_branch(b, menu);
                }else {
                    angular.extend(b,menu);
                }
                $scope.menu = {};


            });

    };
    //删除节点
    $scope.delete = function () {
        let b = tree.get_selected_branch();
        if(!b){
            return toaster.pop('warning', '', '未选中节点！');
        }
        deleteMenuModal('',b)
    };


    //显示删除节点模态框
    function deleteMenuModal(size,b) {
        let modalInstance = $modal.open({
            templateUrl: 'deleteModal.html',
            controller: 'deleteMenuModalIsCtrl',
            size: size,
            resolve: {
                id:function () {
                    return b.id;
                }

            }
        });

        modalInstance.result.then(function (id) {
            //注册或修改用户
            $q.when(deleteMenuById(id))
                .then(function () {
                    tree.delete_branch(b);
                    $scope.menu = {};
                });
        });
        //删除菜单
        function deleteMenuById(id) {
            let deferred = $q.defer();
            $http({
                method: 'GET',
                url:appurl+'/Menu/deleteById',
                params:{id:id}
            }).then(function successCallback(response) {
                let data = response.data;
                deferred.resolve(data);
            });
            return deferred.promise;
        }
    }

    //添加节点
    $scope.addBranch = function(root) {
        let menu = {};
        if(root){
            let parent_menu= tree.get_selected_branch();
            if(!parent_menu){
                return toaster.pop('warning', '', '未选中节点！');
            }
            menu.parentid=parent_menu.id;
        }else {
            menu.parentid=1
        }
        $scope.menu = menu;

    };

    //初始化载入数据
    function loadMenuData() {
        //初始化载入数据
        $scope.my_tree = tree = {};
        $scope.my_data = [];
        $scope.doing_async = true;
        $scope.selectMenus().then(function (list) {
            $scope.my_data = list;
            $scope.doing_async = false;
        });
    }
    loadMenuData();

});

//用户删除模态框实例
app.controller('deleteMenuModalIsCtrl', ['$scope', '$modalInstance', 'id', function($scope, $modalInstance,id) {
    $scope.msg = '请确认是否删除该节点？';

    $scope.ok = function () {
        $modalInstance.close(id);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };


}]);