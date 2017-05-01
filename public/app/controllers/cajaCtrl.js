//inject the stuff service into main Angular module
angular.module('cajaCtrl',['cajaService'])	
//create a controller and inject the Stuff factory
	.controller('cajaController',function($rootScope,$scope,CajaService, MenuService)	{
		var vm = this;		
		
		vm.message = CajaService.getMessage();			
		
		//	set a processing variable to show loading things
		vm.processing = true;
		
		vm.models = {
        	selected: null,
        	lists: {prodMenu: [], prodSelect: []}
    	};

    	MenuService.all()
		.success(function(data)	{		
			vm.models.lists.prodMenu = data;
		});
		

		// Model to JSON for demo purpose
	    $scope.$watch('models', function(model) {
	        $scope.modelAsJson = angular.toJson(model, true);
	    }, true);

		//function to delete a CajaService
		vm.deleteMenu = function(id)	{
			vm.processing = true;

			// accepts the CajaService id as a parameter		
			CajaService.delete(id)
				.success(function(data)	{

				// get all users to update the table 
				// you can also set up your api 
				// to return the list of users with the delete call
				//vm.message = data.message;
				vm.message = data.message;
				CajaService.all()
				.success(function(data)	{
					vm.processing = false;
					vm.menus = data;
					$scope.$apply();
					});
				});
			};
	})

// controller applied to CajaService creation page
	.controller('cajaCreateController', function($rootScope,$scope,$location,CajaService,MenuService)	{

		var vm = this;
		vm.submitted = false;
		// variable to hide/show elements of the view
		// differentiates between create or edit page
		vm.type = 'create';
		vm.message = CajaService.getMessage();			
		vm.typeCaja = ['Ingreso','Egreso'];	
		//	set a processing variable to show loading things
		vm.processing = true;
		
		vm.models = {
        	selected: null,
        	lists: [{name : "Menú", list : []},{name : "Productos seleccionados", list : []}]        		        	
    	};
    	vm.data = {};
    	// Model to JSON for demo purpose
	    $scope.$watch('cajaCtrl.models', function(model) {
	    	vm.data.total = 0;
	    	for (var i in vm.models.lists[1].list) {
	    		vm.data.total += Number(vm.models.lists[1].list[i].price*vm.models.lists[1].list[i].quantity);
	    	}	    	
	    }, true);
	   

    	MenuService.all()
		.success(function(data)	{	
			vm.models.lists[0].list = [];
			for(var i in data){
				data[i].quantity = 1;
				vm.models.lists[0].list.push(data[i]);				
			}	
			//vm.models.lists[0].list = data;			
		});
		
		
		// function to create a CajaService
		vm.saveCaja = function(isValid)	{
			vm.submitted = true;
			if(isValid){
				vm.processing = true;

				//clear the message
				vm.message = '';
				vm.menus = vm.models.lists[1].list = data;	
				// use the create function in the userService
				CajaService.create(vm.data)
					.success(function (data){
						
						vm.processing = false;

						//clear the form
						vm.data = {};
						vm.message = data.message;
						
						$location.path('/menus');
						//$rootScope.message = data.message;
						CajaService.setMessage(data.message);
					});
			}			
		};
		vm.search_param = "";		
		vm.search = function(){
			//Search by plato
			MenuService.search(vm.search_param)
			.success(function (data){
				vm.models.lists[0].list = [];
				for(var i in data){
					data[i].quantity = 1;
					vm.models.lists[0].list.push(data[i]);				
				}	
				
			});

		}

	})

	//	controller applied to CajaService edit page
	.controller('cajaEditController', function($rootScope,$routeParams,$location,CajaService,MenuService)	{
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

			//	get the CajaService data for the CajaService you want to edit
			//	$routeParams is the way we grab data from the URL
		CajaService.get($routeParams.menu_id)
			.success(function(data)	{
				vm.data = data;	
				vm.data.dayOfTheWeek = vm.data.dayOfTheWeek.split(",");	
				TypeMenuService.all()
				.success(function(data)	{		
					vm.typeMenus = data;
				});		
			});

			//	function to save the CajaService
		vm.saveMenu = function(isValid) {
			vm.processing = true;
			vm.message = '';
			vm.submitted = true;
			if(isValid && vm.data.dayOfTheWeek.length > 0){
			//	call the userService function to update
				CajaService.update($routeParams.menu_id, vm.data)
					.success(function(data) {
						vm.processing = false;

						//clear the form
						vm.data = {};

						//bind the message from API to vm.message
						//vm.message = data.message;
						//$rootScope.$broadcast("message",data.message);
						CajaService.setMessage(data.message);
						$location.path('/menus');
					});
			}
		};

	});
