var express = require('express')
const passport = require("passport")
const bcrypt = require('bcryptjs')
const jsonwt = require('jsonwebtoken')


const myurl = require('../../setup/myurl')

const router = express.Router();

//schema for person to register

const Person = require("../../modals/persons")

//@type POST
//@route /api/auth/register
//@desc route for registration of users
//@access Public 

router.post("/register" ,(req ,res)=> 

{
	Person.findOne({email:req.body.email})
		.then(person =>{

			if(person){return res.status(400).json({emailerror:"email"})}
		else{
			const newperson = new Person(
			{
				name : req.body.name,
				email : req.body.email,
				password : req.body.password,
			})
			//password incripted using bcript
			bcrypt.genSalt(10, (err , salt)=>{
				bcrypt.hash(newperson.password ,salt,(err ,hash)=>{
					if(err) throw err;
					newperson.password = hash
					newperson.save()
					.then(person=>res.json(person))
					.catch(err =>console.log(err))
				})
			})

		}

		})
		.catch(err => console.log(err))
})




//@type POST
//@route /api/auth/login
//@desc route for login of users
//@access Public 

router.post("/login" , (req , res) =>{

	const email = req.body.email
	const password =req.body.password

	Person.findOne({email})
	.then( person =>{
			if(!person){
				return res.status(404).json({email :"user not foier"});
			}
			bcrypt.compare(password ,person.password)
			.then(isc =>{
				if(isc){
				//res.json({success :"logged in"})
				//payload releasing from stratagy  
				const payload ={
					id :person.id,
					name:person.name,
					email :person.email,
				};
				jsonwt.sign(
					payload,
					myurl.secret,
					{expiresIn :3000},
					(err , token) =>{
						res.json({
							success :true,
							token: "bearer "+token,
						})
					})

			}
				else{res.status(400).json({password :"glat hai"})}
			})
			.catch(err =>console.log(err))
			
			

	})
	.catch(err => console.log(err));

})

//@type POST
//@route /api/auth/profile
//@desc route for user profile
//@access Private

router.get('/profile', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.send(res.json({
        	name :req.user.name,
        	id:req.user.id,
        	email:req.user.email,
        	}));
    }
);

module.exports = router;
