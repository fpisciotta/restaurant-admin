//gets data using $http
//Data gets passed into controller directory to get displayed
angular.module('menuService', [])

.factory('MenuService',function($http){
	//create the object
	var menuFactory = {};
	var messages = [];
	//get a single user
	menuFactory.get = function(id)	{
		//a function to get all the stuff
		return $http.get('api/menus/' + id );
	};
	//get all users
	menuFactory.all = function()	{
		return $http.get('/api/menus');
	};

	//create a user
	menuFactory.create = function(menuData)	{
		return $http.post('/api/menus', menuData);
	};

	//update a user
	menuFactory.update = function(id,menuData)	{
		return $http.put('/api/menus/' + id, menuData);
	};

	menuFactory.search = function(search_param){
		return $http.get('/api/menus?search='+search_param);
	}

	//delete a user
	menuFactory.delete = function(id)	{
		return $http.delete('/api/menus/' + id);
	};

	menuFactory.setMessage = function(message){
		this.messages = [];
		this.messages.push(message);
	}

	menuFactory.getMessage = function(){
		if(this.messages != null && this.messages.length > 0)
			return this.messages.splice(0, 1 )[0];
		return "";
	}

	//return our entire menuFactory object
	return menuFactory;
	});
