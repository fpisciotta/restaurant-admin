//inject the stuff service into main Angular module
angular.module('typeMenuCtrl',['typeMenuService'])	
//create a controller and inject the Stuff factory
	.controller('typeMenuController',function($rootScope,$scope,TypeMenuService)	{
		var vm = this;		
		
		vm.message = TypeMenuService.getMessage();			
		
		//	set a processing variable to show loading things
		vm.processing = true;
		//vm.message = $scope.message;
		//	grab all the users at page load
		TypeMenuService.all()
		.success(function(data)	{
		
		//	when all the users come back, remove the processing variable
			vm.processing = false;
			//bind the data to a controller variable
			//this come from the stuffService
			vm.menus = data;
		});
		//function to delete a TypeMenuService
		vm.deleteMenu = function(id)	{
			vm.processing = true;

			// accepts the TypeMenuService id as a parameter		
			TypeMenuService.delete(id)
				.success(function(data)	{

				// get all users to update the table 
				// you can also set up your api 
				// to return the list of users with the delete call
				//vm.message = data.message;
				vm.message = data.message;
				TypeMenuService.all()
				.success(function(data)	{
					vm.processing = false;
					vm.menus = data;
					$scope.$apply();
					});
				});
			};
	})

// controller applied to TypeMenuService creation page
	.controller('typeMenuCreateController', function($rootScope,$scope,$location,TypeMenuService,TypeMenuService)	{

		var vm = this;
		vm.submitted = false;
		// variable to hide/show elements of the view
		// differentiates between create or edit page
		vm.type = 'create';		
		// function to create a TypeMenuService
		vm.saveMenu = function(isValid)	{
			vm.submitted = true;
			if(isValid){
				vm.processing = true;

				//clear the message
				vm.message = '';

				// use the create function in the userService
				TypeMenuService.create(vm.data)
					.success(function (data)	{
						
						vm.processing = false;

						//clear the form
						vm.data = {};
						vm.message = data.message;
						
						$location.path('/typemenus');
						//$rootScope.message = data.message;
						TypeMenuService.setMessage(data.message);
					});
			}			
		};

	})

	//	controller applied to TypeMenuService edit page
	.controller('typeMenuEditController', function($rootScope,$routeParams,$location,TypeMenuService)	{
		var vm = this;
			//	variable to hide/show elemments of the view
			//	differentiates between create or edit pages
		vm.type = 'edit';
		
			//	get the TypeMenuService data for the TypeMenuService you want to edit
			//	$routeParams is the way we grab data from the URL
		TypeMenuService.get($routeParams.type_menu_id)
			.success(function(data)	{
				vm.data = data;					
			});

			//	function to save the TypeMenuService
		vm.saveMenu = function(isValid) {
			vm.processing = true;
			vm.message = '';
			vm.submitted = true;
			if(isValid ){
			//	call the userService function to update
				TypeMenuService.update($routeParams.type_menu_id, vm.data)
					.success(function(data) {
						vm.processing = false;

						//clear the form
						vm.data = {};

						//bind the message from API to vm.message
						//vm.message = data.message;
						//$rootScope.$broadcast("message",data.message);
						TypeMenuService.setMessage(data.message);
						$location.path('/typemenus');
					});
			}
		};

	});
