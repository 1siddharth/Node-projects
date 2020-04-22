var jst = require('passport-jwt').Strategy;
var ExtractJwt=require('passport-jwt').ExtractJwt ;

const mongoose = require('mongoose')
const Person = require('../modals/persons')
const mykey = require("../setup/myurl").secret

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = mykey;

module.exports = passport =>
{
	passport.use(new jst
		(opts,
	(jwt_payload, done) =>
	{
		Person.findById(jwt_payload.id)
		.then(person =>
		{
			if(person)
		{
			return done(null ,person);
		}
		return done(null ,false)
		}	 )
		.catch(err =>console.log(err))
		}))

}






