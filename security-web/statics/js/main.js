
require.config({
    baseUrl:"../statics/js/",
    paths:{
        'angular':'angular.min',
        'angular-ui-router':'angular-ui-router.min',
        'angularAMD':'angularAMD.min',
        'angular-animate':'angular-animate.min'
    },
    shim: { 'angularAMD': ['angular'], 'angular-route': ['angular'] },
    deps: ['app']
});

