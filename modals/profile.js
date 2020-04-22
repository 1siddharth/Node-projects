var express = require('express')
var mongoose = require('mongoose')

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
	user: {
		type :Schema.Types.ObjectId,
		ref: "Myperson"
	},

	username:{type:String ,required:true,max :50},

	website:{type:String},

	country:{type:String},

	lang:{type:[String],required:true},

	portfolio:{type:String ,required:true},

	workrole:[{
		role:{type:String},
		country:{type:String},
		company:{type:String},
		from:{type:Date},
		to:{type:Date},


	}],


	details:{type:String},
	
	social :{youtube:String ,instagram:String}
})

module.exports = Profile =mongoose.model("myProfile" ,ProfileSchema)