var express = require('express')
var mongoose = require('mongoose')

const Schema = mongoose.Schema;

const PersonSchema = new Schema(
{
name: {
	type:String,
	required :true,
},
password: {
	type:String,
	required :true,	
},
email: {
	type:String,
	required :true,	
},
Username: {
	type:String,
	required :false,	
},
profile: {
	type:String,
	default :"C:\Users\Siddharth\Pictures\Saved Pictures\siddaa1.jpg"
	
},
date: {
	type:Date,
	default : Date.now,	
}

}
	)
module.exports =Person= mongoose.model("Myperson" , PersonSchema)



