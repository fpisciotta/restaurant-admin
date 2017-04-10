var app = angular.module('mainCtrl', ['authService','duScroll'])
	
	.controller('homeCtrl', function(){
		var vm = this;
		vm.message = 'HELLO';
	})

	.controller('mainController',['$scope','Auth','$location','$rootScope','$anchorScroll',
		function($rootScope,Auth,$location,$scope, $anchorScroll,$document) {
		var vm = this;
		//get info if a person is logged in
		vm.loggedIn = Auth.isLoggedIn();

		//check to see if a user is logged in on every request
		$rootScope.$on('$routeChangeStart', function () {
			vm.loggedIn = Auth.isLoggedIn();
		});
		
		$scope.toTheTop = function() {
		  $document.scrollTopAnimated(0, 5000).then(function() {
			console && console.log('You just scrolled to the top!');
		  });
		}
		var section3 = angular.element(document.getElementById('section-3'));
		$scope.toSection3 = function() {
		  $document.scrollToElementAnimated(section3);
		}
		//function to handle login form
		vm.doLogin = function () {
			//processing Icon
			vm.processing = true;
			// clear error handling
			vm.error = '';

			// call the Auth.login() function
		Auth.login(vm.loginData.username, vm.loginData.password)
			.success(function (data) {
					vm.processing = false;

				if (data.success) {
					//if a user successfully logs in, redirect to users page
					$location.path('/users');
					//this.user = 'name:unchanged';
					Auth.getUser()
						.then(function(data) {
							$scope.name = data.name;
						 })
					}
				else vm.error = data.message;
			});
		};

		//function to handle loggin out
		vm.doLogout = function () {
			Auth.logout();
			//reset all user info
			vm.user = {};
			$location.path('/login');
		}
	}]).value('duScrollOffset', 30);;






