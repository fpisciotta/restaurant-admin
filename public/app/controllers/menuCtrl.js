//inject the stuff service into main Angular module
angular.module('menuCtrl',['menuService'])	
//create a controller and inject the Stuff factory
	.controller('menuController',function($rootScope,$scope,MenuService)	{
		var vm = this;		
		
		vm.message = MenuService.getMessage();			
		
		//	set a processing variable to show loading things
		vm.processing = true;
		//vm.message = $scope.message;
		//	grab all the users at page load
		MenuService.all()
		.success(function(data)	{
		
		//	when all the users come back, remove the processing variable
			vm.processing = false;
			//bind the data to a controller variable
			//this come from the stuffService
			vm.menus = data;
		});
		//function to delete a MenuService
		vm.deleteMenu = function(id)	{
			vm.processing = true;

			// accepts the MenuService id as a parameter		
			MenuService.delete(id)
				.success(function(data)	{

				// get all users to update the table 
				// you can also set up your api 
				// to return the list of users with the delete call
				//vm.message = data.message;
				vm.message = data.message;
				MenuService.all()
				.success(function(data)	{
					vm.processing = false;
					vm.menus = data;
					$scope.$apply();
					});
				});
			};
	})

// controller applied to MenuService creation page
	.controller('menuCreateController', function($rootScope,$scope,$location,MenuService,TypeMenuService)	{

		var vm = this;
		vm.submitted = false;
		// variable to hide/show elements of the view
		// differentiates between create or edit page
		vm.type = 'create';
		vm.dayOfTheWeek = ['lunes', 'martes', 'miercoles', 'jueves','viernes'];
		vm.data = {};
		vm.data.dayOfTheWeek = [];
		vm.toggleSelection = function toggleSelection(day) {
		    var idx = vm.data.dayOfTheWeek.indexOf(day);

		    // Is currently selected
		    if (idx > -1) {
		      vm.data.dayOfTheWeek.splice(idx, 1);
		    }
		    else {
		      vm.data.dayOfTheWeek.push(day);
		    }
  		};
  		TypeMenuService.all()
		.success(function(data)	{		
			vm.typeMenus = data;
		});
		// function to create a MenuService
		vm.saveMenu = function(isValid)	{
			vm.submitted = true;
			if(isValid && vm.data.dayOfTheWeek.length > 0){
				vm.processing = true;

				//clear the message
				vm.message = '';

				// use the create function in the userService
				MenuService.create(vm.data)
					.success(function (data)	{
						
						vm.processing = false;

						//clear the form
						vm.data = {};
						vm.message = data.message;
						
						$location.path('/menus');
						//$rootScope.message = data.message;
						MenuService.setMessage(data.message);
					});
			}			
		};

	})

	//	controller applied to MenuService edit page
	.controller('menuEditController', function($rootScope,$routeParams,$location,MenuService,TypeMenuService)	{
		var vm = this;
			//	variable to hide/show elemments of the view
			//	differentiates between create or edit pages
		vm.type = 'edit';
		vm.dayOfTheWeek = ['lunes', 'martes', 'miercoles', 'jueves','viernes'];		
		vm.toggleSelection = function toggleSelection(day) {
		    var idx = vm.data.dayOfTheWeek.indexOf(day);

		    // Is currently selected
		    if (idx > -1) {
		      vm.data.dayOfTheWeek.splice(idx, 1);
		    }
		    else {
		      vm.data.dayOfTheWeek.push(day);
		    }
  		};

			//	get the MenuService data for the MenuService you want to edit
			//	$routeParams is the way we grab data from the URL
		MenuService.get($routeParams.menu_id)
			.success(function(data)	{
				vm.data = data;	
				vm.data.dayOfTheWeek = vm.data.dayOfTheWeek.split(",");	
				TypeMenuService.all()
				.success(function(data)	{		
					vm.typeMenus = data;
				});		
			});

			//	function to save the MenuService
		vm.saveMenu = function(isValid) {
			vm.processing = true;
			vm.message = '';
			vm.submitted = true;
			if(isValid && vm.data.dayOfTheWeek.length > 0){
			//	call the userService function to update
				MenuService.update($routeParams.menu_id, vm.data)
					.success(function(data) {
						vm.processing = false;

						//clear the form
						vm.data = {};

						//bind the message from API to vm.message
						//vm.message = data.message;
						//$rootScope.$broadcast("message",data.message);
						MenuService.setMessage(data.message);
						$location.path('/menus');
					});
			}
		};

	});
