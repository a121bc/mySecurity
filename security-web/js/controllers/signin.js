'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', '$localStorage', function($scope, $http, $state,$localStorage) {
    $scope.user = {};
    $scope.authError = null;
    $scope.login = function() {
        $scope.authError = null;


        // Try to login
        $http({
            method: 'post',
            url:appurl+'/oauth/token',
            params:{
              grant_type:'password',
              username: $scope.user.username,
              password: $scope.user.password
            }

        })
        .then(function(response) {
        if ( !response.status==200 ) {
            $scope.authError = 'Username or Password not right';
        }else{
            $localStorage.token = response.data;
            $state.go('app');
        }
        }, function(x) {
            $scope.authError = 'Server Error';
            console.log(x);
        });
    };
  }])
;