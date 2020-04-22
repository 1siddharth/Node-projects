const mongoose = require('mongoose')
const express = require('express')
const jwt =require('json-web-token')

const Schema = mongoose.Schema

const QuestionSchema = new Schema(
{

	user :{
		type :Schema.Types.ObjectId,
		ref : 'Myperson'
	},
	textone :{
		type:String,
		required :true
	},
	texttwo:
	{
		type :String,
		required:true
	},
	name :{
		type :String
	},
	upvotes:[
	{
		user :{
		type:Schema.Types.ObjectId,
		ref : 'Myperson'
	},
	}],
	answer :[
	{
		user :{
		type:Schema.Types.ObjectId,
		ref : 'Myperson'
	},

	text:{
		type:String,
	
	},
	name :{
		type :String,
		
	},
	date:{
		type:Date,
		deafult:Date.now
	}
	}]

}

	);

module.exports =Question= mongoose.model('Myquestion',QuestionSchema)

