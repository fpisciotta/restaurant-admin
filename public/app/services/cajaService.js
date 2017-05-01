//gets data using $http
//Data gets passed into controller directory to get displayed
angular.module('cajaService', [])

.factory('CajaService',function($http){
	//create the object
	var menuFactory = {};
	var messages = [];
	//get a single user
	menuFactory.get = function(id)	{
		//a function to get all the stuff
		return $http.get('api/caja/' + id );
	};
	//get all users
	menuFactory.all = function()	{
		return $http.get('/api/caja');
	};

	//create a user
	menuFactory.create = function(menuData)	{
		return $http.post('/api/caja', menuData);
	};

	//update a user
	menuFactory.update = function(id,menuData)	{
		return $http.put('/api/caja/' + id, menuData);
	};

	//delete a user
	menuFactory.delete = function(id)	{
		return $http.delete('/api/caja/' + id);
	};

	menuFactory.search = function(search_param){
		return $http.get('/api/caja?search='+search_param);
	}

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
