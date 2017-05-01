 
angular.module('userApp', [
	'ngAnimate',
	'app.routes',
	'authService',
	'userService',
	'menuService',
	'typeMenuService',
	'cajaService',
	'mainCtrl',
	'userCtrl',
	'menuCtrl',
	'typeMenuCtrl',
	'cajaCtrl',
	'dndLists'
	])
.config(function($httpProvider)	{	
	//attach our auth inteceptor to the http requests
	$httpProvider.interceptors.push('AuthInterceptor');
});

