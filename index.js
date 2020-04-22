var express = require('express')
var mongoose = require('mongoose')
const bodyparser = require("body-parser")
const passport = require("passport")
port =  3000
//bring all the routes
const auth = require("./routes/api/auth")
const profile = require("./routes/api/profile")
const questions = require("./routes/api/questions")



var app = express()

//middleware
app.use(bodyparser.urlencoded({extended :false}))
app.use(bodyparser.json())

 //routes


//config of mongo db
const db = require("./setup/myurl").mongoURL

//attempt to connect to database
mongoose.connect(db).then(() => console.log("connected"))
.catch((err)=> console.log(err))

//actal
//passport middleware
app.use(passport.initialize());
//jwt stratagy configration
require("./strategy/jsonstratagy")(passport)


//
app.get('/' , (req , res) =>{ 
	res.send("hello big stack "),
	console.log("hello bihstack ")})

app.use('/api/auth', auth)
app.use('/api/profile', profile)
app.use('/api/questions', questions)


app.listen(port ,() =>{console.log("running")})