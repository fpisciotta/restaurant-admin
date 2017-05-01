angular.module('app.routes', ['ngRoute'])
// configure our routes
.config(function($routeProvider, $locationProvider) {
    $routeProvider

        
		
		//show all menus
        .when('/menus',{
            templateUrl: 'app/views/pages/menus/all.html',
            controller: 'menuController',
            controllerAs: 'menuCtrl'
        })
		
		//form to create a new user
        // same view as edit page
        .when('/menus/create',  {
            templateUrl: 'app/views/pages/menus/single.html',
            controller: 'menuCreateController',
            controllerAs: 'menuCtrl'
        })
        //  page to edit a user
        .when('/menus/:menu_id', {
            templateUrl: 'app/views/pages/menus/single.html',
            controller: 'menuEditController',
            controllerAs: 'menuCtrl'
        })
		
        //show all type menus
        .when('/typemenus',{
            templateUrl: 'app/views/pages/type_menus/all.html',
            controller: 'typeMenuController',
            controllerAs: 'typeMenuCtrl'
        })
        
        //form to create a new user
        // same view as edit page
        .when('/typemenus/create',  {
            templateUrl: 'app/views/pages/type_menus/single.html',
            controller: 'typeMenuCreateController',
            controllerAs: 'typeMenuCtrl'
        })
        //  page to edit a user
        .when('/typemenus/:type_menu_id', {
            templateUrl: 'app/views/pages/type_menus/single.html',
            controller: 'typeMenuEditController',
            controllerAs: 'typeMenuCtrl'
        })


        //show all type menus
        .when('/caja',{
            templateUrl: 'app/views/pages/caja/single.html',
            controller: 'cajaCreateController',
            controllerAs: 'cajaCtrl'
        })
        
        //form to create a new user
        // same view as edit page
        .when('/caja/all',  {
            templateUrl: 'app/views/pages/caja/all.html',
            controller: 'cajaController',
            controllerAs: 'cajaCtrl'
        })
        //  page to edit a user
        .when('/caja/:caja_id', {
            templateUrl: 'app/views/pages/caja/single.html',
            controller: 'cajaEditController',
            controllerAs: 'cajaCtrl'
        })
		
        //login page
        .when('/login', {
            templateUrl : '/app/views/pages/login.html',
        	controller   : 'mainController',
        	controllerAs   : 'login'
        })
		
		//login page
        .when('/admin', {
            templateUrl : '/app/views/pages/admin.html',
        	controller   : 'mainController',
        	controllerAs   : 'mainCtrl'
        })

        //show all users
        .when('/users',{
            templateUrl: 'app/views/pages/users/all.html',
            controller: 'userController',
            controllerAs: 'user'
        })

        //form to create a new user
        // same view as edit page
        .when('/users/create',  {
            templateUrl: 'app/views/pages/users/single.html',
            controller: 'userCreateController',
            controllerAs: 'user'
        })
        //  page to edit a user
        .when('/users/:user_id', {
            templateUrl: 'app/views/pages/users/single.html',
            controller: 'userEditController',
            controllerAs: 'user'
        });
    // get rid of the hash in the URL
    $locationProvider.html5Mode(true);
});
