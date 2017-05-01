//Load Packages
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//user Schema by mongoose
var UserSchema = new Schema({
	name : String,
	username : {
		type:String,
		require: true, 
		index:{	unique:true	}
	},
	password: {
		type:String, 
		required:true, 
		select:true
	}
});

//hash the password before the user is saved
UserSchema.pre('save',function(next){
	var user = this;

	//hash the password only if the password has been 
	//changed or user is new

	if(!user.isModified('password')) return next();

	//generate the hash
	bcrypt.hash(user.password, null, null, function(err, hash){
		if(err) return next(err);

		//change the password to the hashed version
		user.password = hash;
		next();
	});
});

//method to compare a given password with the database hash
UserSchema.methods.comparePassword = function(password){
	var user = this;

	return bcrypt.compareSync(password,user.password);
};
var User = mongoose.model('User',UserSchema);

var TypeMenuSchema = new Schema({
	name : {type:String},
	description : {type:String},
	creationDate : {type:Date, default : Date.now}
}, { autoIndex: true });
var MenuSchema = new Schema({
	name : {type:String},
	description : {type:String},
	price : {type:String},
	type : {type: mongoose.Schema.Types.ObjectId, ref : 'TypeMenu'},
	dayOfTheWeek : {type:String},
	creationDate : {type:Date, default : Date.now},
	image : {type: String}
}, { autoIndex: true });

var CajaSchema = new Schema({	
	type : {type:String},
	total : {type:Number},
	menus : [{ type: Schema.Types.ObjectId, ref: 'Menu'}],
	others : [{ type: String}],
	creationDate : {type:Date, default : Date.now}	
}, { autoIndex: true });

var TypeMenu = mongoose.model('TypeMenu',TypeMenuSchema)
var Menu = mongoose.model('Menu',MenuSchema)
var Caja = mongoose.model('Caja',CajaSchema)
module.exports = {
	TypeMenu : TypeMenu,
	Menu : Menu,
	User : User,
	Caja : Caja	
} 
