//gets data using $http
//Data gets passed into controller directory to get displayed
angular.module('typeMenuService', [])

.factory('TypeMenuService',function($http){
	//create the object
	var menuFactory = {};
	var messages = [];
	//get a single user
	menuFactory.get = function(id)	{
		//a function to get all the stuff
		return $http.get('api/typemenus/' + id );
	};
	//get all users
	menuFactory.all = function()	{
		return $http.get('/api/typemenus');
	};

	//create a user
	menuFactory.create = function(menuData)	{
		return $http.post('/api/typemenus', menuData);
	};

	//update a user
	menuFactory.update = function(id,menuData)	{
		return $http.put('/api/typemenus/' + id, menuData);
	};

	//delete a user
	menuFactory.delete = function(id)	{
		return $http.delete('/api/typemenus/' + id);
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
