/* Express Routes */
var schema = require('../models/schema');
var Menu = schema.Menu;
var Caja = schema.Caja;
var User = schema.User;
var TypeMenu = schema.TypeMenu;
var jwt = require('jsonwebtoken');
var config = require('../../config');

//super secret for creating token
var superSecret = config.secret;

module.exports = function(app,express){

//get an instance of the express router
var apiRouter = express.Router();


//===============================  Token Middleware  =========================
// For /users request
// Checks for token for /api routes
apiRouter.use("/",function(req,res,next){
	//check header or url parameters or post parameters for token
	var token = req.body.token || req.param('token') ||req.headers['x-access-token'];

	//decode token
	if(token){
		//console.log("Token"+JSON.stringify(token));
		//verifies secret and checks exp
		jwt.verify(token,superSecret,function(err,decoded){
			if(err){
				return res.status(403).send({
					success: false,
					message: 'Failed to authenticate token.'
				});
			}else{
				//save to request for use in other routes
				req.decoded = decoded;
				next();// this make sure we go to the next routes and dont stop here
			}
		});
	}else{
		// if there is no token
		//return an HTTP response of 403 (access forbidden) and an error message
		return res.status(403).send({
			success:false,
			message: 'No token provided.'
		});
	}
});

//===================================  /users  ================================
apiRouter.route('/users')	
	// get all the users (accessed at GET http://localhost::8080/api/users)
	.get(function(req, res) {
			User.find(function(err,users){
				if(err) res.send(err);
				//res: return list of users
					res.json(users);
					});
		});
//===================================  /menus  ================================
apiRouter.route('/menus')
	.post(function(req, res) {
			var menu = new Menu(req.body);
			var self = this;
			console.log("Menu: "+JSON.stringify(req.body))
			menu.save(function(err){
					if(err) 
						res.send(err);			
					else{
						var token = jwt.sign({
							name: self.name,
							username: self.username
						}, superSecret, {expiresIn: 86400}); //24 hrs
						res.json({ message:'Menú creado!' });
					}
			});			
		})
	// get all the users (accessed at GET http://localhost::8080/api/users)
	.get(function(req, res) {
			var query = {}
			console.log("Param"+req.param("search"));
			if(req.param("search") != 'undefined'){
				query.name = {
                         $regex: new RegExp(req.param("search"), "ig")
                }
			}
			console.log("Query: "+JSON.stringify(query));	
			Menu.find(query).populate("type").exec(function(err,menus){
				if(err) res.send(err);
				console.log("Menu: "+JSON.stringify(menus))
					res.json(menus);
					});
		});
//===================================  /typemenus  ================================
apiRouter.route('/typemenus')
	.post(function(req, res) {
			var typeMenu = new TypeMenu(req.body);
			var self = this;
			console.log("Tipo de Menu: "+JSON.stringify(req.body))
			typeMenu.save(function(err){
					if(err) 
						res.send(err);			
					else{
						var token = jwt.sign({
							name: self.name,
							username: self.username
						}, superSecret, {expiresIn: 86400}); //24 hrs
						res.json({ message:'Tipo de Menú creado!' });
					}
			});			
		})
	// get all the users (accessed at GET http://localhost::8080/api/users)
	.get(function(req, res) {
			TypeMenu.find(function(err,menus){
				if(err) res.send(err);
				console.log("TypeMenu: "+JSON.stringify(menus))
				res.json(menus);
				});
		});
//===================================  /typemenus  ================================
apiRouter.route('/caja')
	.post(function(req, res) {
			var caja = new Caja(req.body);
			var self = this;
			//console.log("Tipo de Menu: "+JSON.stringify(req.body))
			caja.save(function(err){
					if(err) 
						res.send(err);			
					else{
						//var token = jwt.sign({
						//	name: self.name,
						//	username: self.username
						//}, superSecret, {expiresIn: 86400}); //24 hrs
						res.json({ message:'Caja creada!' });
					}
			});			
		})
	// get all the users (accessed at GET http://localhost::8080/api/caja)
	.get(function(req, res) {
			var query = {}
			console.log("Param"+req.param("search"));
			if(req.param("search") != null){
				query.name = "/"+req.param("search")+"/i";
			}			
			Caja.find(query,function(err,menus){
				if(err) res.send(err);
				//console.log("TypeMenu: "+JSON.stringify(menus))
				res.json(menus);
				});
		});
//=====================================  /me  ==================================
apiRouter.route('/me')
		.get(function(req,res){
		res.send(req.decoded);
	});

//===============================  /users/:user_id  ============================
apiRouter.route('/users/:user_id')
	//get the user with that id
	//(accessed at GET http://localhost:8080/api/users/:user_id)
	.get(function(req,res){
		User.findById(req.params.user_id, function(err,user){
			if(err) res.send(err);
			//return that user
			res.json(user);
		});
	})
	//update the user with this id
	//(accessed at PUT http://localhost:8080/api/users/:user_id)
	.put(function(req,res){
			//use our user model to find the user we want
			User.findById(req.params.user_id,function(err,user)
			{
				if(err) res.send(err);
				//update the users info only if its new
				if(req.body.name) user.name = req.body.name;
				if(req.body.username) user.username = req.body.username;
				if(req.body.password) user.password = req.body.password;
				//save the user
				var self = this;
				user.save(function(err){
					if(err) res.send(err);
					//return a message
					else{
						var token = jwt.sign({
							name: self.name,
							username: self.username
						}, superSecret, {expiresIn: 86400}); //24 hrs
						res.json({
							name: user.name,
							success: true,
							message:'User updated!',
							token: token
						});	
					}
				});
			});
		})

	.delete(function(req, res){
		User.remove({
				_id:req.params.user_id
			}, function(err,user){
				if(err) return res.send(err);
				res.json({message: 'Successfully deleted'});
		});
	});

//===============================  /menus/:menu_id  ============================
apiRouter.route('/menus/:menu_id')
	//get the user with that id
	//(accessed at GET http://localhost:8080/api/users/:user_id)
	.get(function(req,res){
		Menu.findById(req.params.menu_id, function(err,menu){
			if(err) res.send(err);
			//return that menu
			res.json(menu);
		});
	})
	//(accessed at PUT http://localhost:8080/api/users/:user_id)
	.put(function(req,res){
			//use our user model to find the user we want
			Menu.findById(req.params.menu_id,function(err,menu)
			{
				if(err) res.send(err);
				//update the users info only if its new
				if(req.body.name) menu.name = req.body.name;
				if(req.body.description) menu.description = req.body.description;
				if(req.body.price) menu.price = req.body.price;
				if(req.body.type) menu.type = req.body.type;
				if(req.body.dayOfTheWeek) menu.dayOfTheWeek = req.body.dayOfTheWeek;
				if(req.body.image) menu.image = req.body.image;				
				//save the user
				var self = this;
				menu.save(function(err){
					if(err) res.send(err);
					//return a message
					else{
						var token = jwt.sign({
							name: self.name,
							username: self.username
						}, superSecret, {expiresIn: 86400}); //24 hrs
						res.json({
							name: menu.name,
							success: true,
							message:'Menu actualizado!',
							token: token
						});	
					}
				});
			});
		})

	.delete(function(req, res){
		Menu.remove({
				_id:req.params.menu_id
			}, function(err,menu){
				if(err) return res.send(err);
				res.json({message: 'Menu eliminado'});
		});
	});
//===============================  /typemenus/:type_menu_id  ============================
apiRouter.route('/typemenus/:type_menu_id')
	//get the user with that id
	//(accessed at GET http://localhost:8080/api/users/:user_id)
	.get(function(req,res){
		TypeMenu.findById(req.params.type_menu_id, function(err,menu){
			if(err) res.send(err);
			console.log("Type menu: "+JSON.stringify(menu))
			res.json(menu);
		});
	})
	//(accessed at PUT http://localhost:8080/api/users/:user_id)
	.put(function(req,res){
			//use our user model to find the user we want
			TypeMenu.findById(req.params.type_menu_id,function(err,menu)
			{
				if(err) res.send(err);
				//update the users info only if its new
				if(req.body.name) menu.name = req.body.name;
				if(req.body.description) menu.description = req.body.description;					
				//save the user
				var self = this;
				menu.save(function(err){
					if(err) res.send(err);
					//return a message
					else{
						var token = jwt.sign({
							name: self.name,
							username: self.username
						}, superSecret, {expiresIn: 86400}); //24 hrs
						res.json({
							name: menu.name,
							success: true,
							message:'Tipo de Menu actualizado!',
							token: token
						});	
					}
				});
			});
		})

	.delete(function(req, res){
		TypeMenu.remove({
				_id:req.params.type_menu_id
			}, function(err,menu){
				if(err) return res.send(err);
				res.json({message: 'Tipo de Menu eliminado'});
		});
	});

//===============================  /caja/:caja_id  ============================
apiRouter.route('/caja/:caja_id')
	//get the user with that id	
	.get(function(req,res){
		Caja.findById(req.params.caja_id, function(err,menu){
			if(err) res.send(err);
			//console.log("Type menu: "+JSON.stringify(menu))
			res.json(menu);
		});
	})
	//(accessed at PUT http://localhost:8080/api/users/:user_id)
	.put(function(req,res){
			//use our user model to find the user we want
			Caja.findById(req.params.caja_id,function(err,menu)
			{
				if(err) res.send(err);
				//update the users info only if its new
				if(req.body.type) menu.type = req.body.type;
				if(req.body.total) menu.total = req.body.total;
				if(req.body.menus) menu.menus = req.body.menus;
				if(req.body.others) menu.others = req.body.others;							
				//save the user
				var self = this;
				menu.save(function(err){
					if(err) res.send(err);
					//return a message
					else{
						var token = jwt.sign({
							name: self.name,
							username: self.username
						}, superSecret, {expiresIn: 86400}); //24 hrs
						res.json({							
							message:'Registro de caja actualizado!'							
						});	
					}
				});
			});
		})

	.delete(function(req, res){
		Caja.remove({
				_id:req.params.caja_id
			}, function(err,menu){
				if(err) return res.send(err);
				res.json({message: 'Registro de Caja eliminado'});
		});
	});

	return apiRouter;
};

