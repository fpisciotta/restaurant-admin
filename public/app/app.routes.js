angular.module('app.routes', ['ngRoute'])
// configure our routes
.config(function($routeProvider, $locationProvider) {
    $routeProvider

        .when('/', {
            templateUrl : '/app/views/pages/admin.html',
            controller   : 'mainController',
            controllerAs   : 'mainCtrl',
            access : {allowAnonymous : false}
        })
		
		//show all menus
        .when('/menus',{
            templateUrl: 'app/views/pages/menus/all.html',
            controller: 'menuController',
            controllerAs: 'menuCtrl',
            access : {allowAnonymous : false}
        })
		
		//form to create a new user
        // same view as edit page
        .when('/menus/create',  {
            templateUrl: 'app/views/pages/menus/single.html',
            controller: 'menuCreateController',
            controllerAs: 'menuCtrl',
            access : {allowAnonymous : false}
        })
        //  page to edit a user
        .when('/menus/:menu_id', {
            templateUrl: 'app/views/pages/menus/single.html',
            controller: 'menuEditController',
            controllerAs: 'menuCtrl',
            access : {allowAnonymous : false}
        })
		
        //show all type menus
        .when('/typemenus',{
            templateUrl: 'app/views/pages/type_menus/all.html',
            controller: 'typeMenuController',
            controllerAs: 'typeMenuCtrl',
            access : {allowAnonymous : false}
        })
        
        //form to create a new user
        // same view as edit page
        .when('/typemenus/create',  {
            templateUrl: 'app/views/pages/type_menus/single.html',
            controller: 'typeMenuCreateController',
            controllerAs: 'typeMenuCtrl',
            access : {allowAnonymous : false}
        })
        //  page to edit a user
        .when('/typemenus/:type_menu_id', {
            templateUrl: 'app/views/pages/type_menus/single.html',
            controller: 'typeMenuEditController',
            controllerAs: 'typeMenuCtrl',
            access : {allowAnonymous : false}
        })


        //show all type menus
        .when('/caja',{
            templateUrl: 'app/views/pages/caja/single.html',
            controller: 'cajaCreateController',
            controllerAs: 'cajaCtrl',
            access : {allowAnonymous : false}
        })
        
        //form to create a new user
        // same view as edit page
        .when('/caja/all',  {
            templateUrl: 'app/views/pages/caja/all.html',
            controller: 'cajaController',
            controllerAs: 'cajaCtrl',
            access : {allowAnonymous : false}
        })
        //  page to edit a user
        .when('/caja/:caja_id', {
            templateUrl: 'app/views/pages/caja/single.html',
            controller: 'cajaEditController',
            controllerAs: 'cajaCtrl',
            access : {allowAnonymous : false}
        })
		
        //login page
        .when('/login', {
            templateUrl : '/app/views/pages/login.html',
        	controller   : 'mainController',
        	controllerAs   : 'login',
            access : {allowAnonymous : true}
        })
		
		//login page
        .when('/admin', {
            templateUrl : '/app/views/pages/admin.html',
        	controller   : 'mainController',
        	controllerAs   : 'mainCtrl',
            access : {allowAnonymous : false}
        })

        //show all users
        .when('/users',{
            templateUrl: 'app/views/pages/users/all.html',
            controller: 'userController',
            controllerAs: 'user',
            access : {allowAnonymous : false}
        })

        //form to create a new user
        // same view as edit page
        .when('/users/create',  {
            templateUrl: 'app/views/pages/users/single.html',
            controller: 'userCreateController',
            controllerAs: 'user',
            access : {allowAnonymous : false}
        })
        //  page to edit a user
        .when('/users/:user_id', {
            templateUrl: 'app/views/pages/users/single.html',
            controller: 'userEditController',
            controllerAs: 'user',
            access : {allowAnonymous : false}
        });
    // get rid of the hash in the URL
    $locationProvider.html5Mode(true);
});
