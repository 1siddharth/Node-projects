var express = require('express')
const mongoose = require('mongoose')

const passport = require("passport")
const router = express.Router();

const Person = require("../../modals/persons")
const Profile = require("../../modals/profile")
const Question = require("../../modals/question")

//@type GET
//@route /api/questions
//@desc route for login of users
//@access private

router.get("/" , (req ,res) => {

Question.find().sort({date :"desc"}).then(question =>
res.json(question)
	).catch(err =>console.log("no profile"))



})


//@type GET
//@route /api/questions
//@desc route for submitting question
//@access private

router.post('/' ,passport.authenticate('jwt',{session:false}),
(req,res) =>{
	const que = new Question({

			textone :req.body.textone,
			texttwo :req.body.texttwo,
			name :req.body.name,
			user:req.body.id,

			});
	que.save().
	then(question =>res.json(question))
	.catch(err =>console.log(err))
}
	)
//@type GET
//@route /api/questions
//@desc route for submitting question
//@access private

router.post('/answer/:id' ,passport.authenticate('jwt',{session:false}),
(req,res) =>{
	Question.findById(req.params.id)
	.then( question =>{
		const ans = {
			user:req.user.id,
			name:req.body.name,
			text:req.body.text,
		};
		question.answer.unshift(ans)

		question.save()
		.then(question =>res.json(question))
		.catch(err =>console.log(err))
	}
		)
	.catch(err => console.log(err))
}
	)

router.post('/upvote/:id' ,passport.authenticate('jwt',{session:false}),
(req,res) =>
{
Profile.findOne({user :req.user.id})
.then
( profile =>
{
Question.findById(req.params.id)
.then
(question =>
{
	if(question.upvotes.filter(
		upvote => upvote.user.toString()===req.user.id.toString())
		.length >0)
	{
		return res.json({up:"already did"})
	}
	question.upvotes.unshift({user :req.user.id});
	question.save()
	.then(
		question =>res.json(question)

		)
	.catch(err =>console.log(err))
}
)
.catch(err =>console.log(err))

}
)
.catch(err =>console.log(err))
}
)
module.exports = router



