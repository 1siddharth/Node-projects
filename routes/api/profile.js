var express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const passport = require("passport")

//@type GET
//@route /api/auth/profile
//@desc route for login of users
//@access Public 

//route and bring profile and person
const Person = require("../../modals/persons")
const Profile = require("../../modals/profile")


router.get("/" , passport.authenticate('jwt',{session : false}),
	(req ,res) =>{
		Profile.findOne({user: req.user.id})
		.then(
			profile =>{
				if(!profile){
					return res.status(404).json({prof:"not found"})
				}
				res.json(profile)
			}

			)
		.catch(err =>console.log("helo"+err))
})


router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileValues = {};
    profileValues.user = req.user.id;
    if (req.body.username) profileValues.username = req.body.username;
    if (req.body.website) profileValues.website = req.body.website;
    if (req.body.country) profileValues.country = req.body.country;
    if (req.body.portfolio) profileValues.portfolio = req.body.portfolio;
    if (typeof req.body.lang !== undefined) {
      profileValues.lang = req.body.lang.split(",");
    }
    //get social links
    

   if(req.body.facebook) profileValues.facebook = req.body.facebook;
if(req.body.instagram) profileValues.instagram = req.body.instagram; 

    //Do database stuff
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileValues },
            { new: true }
          )
            .then(profile => res.json(profile))
            .catch(err => console.log("problem in update" + err));
        } else {
          Profile.findOne({ username: profileValues.username })
            .then(profile => {
              //Username already exists
              if (profile) {
                res.status(400).json({ username: "Username already exists" });
              }
              //save user
              new Profile(profileValues)
                .save()
                .then(profile => res.json(profile))
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log("Problem in fetching profile" + err));
  }
);

//@type GET
//@route /api/auth/login
//@desc route for login of users
//@access Public 

router.get("/:username" ,(req,res) =>{

	Profile.findOne({username:req.params.username})
	.populate('user' ,['profile' ,'date'])
	.then(profile =>{
	if(!profile){res.status(404).json({notfound:"user not fuond"})
}
res.json(profile)

	})
	.catch(err =>console.log("useranme error:"+err))
})


//@type GET
//@route /api/auth/find/user
//@desc route for everyprofile
//@access Public 

router.get("/find/name" ,(req,res) =>{

	Profile.find()
	.populate('user' ,['profile' ,'date'])
	.then(profiles=>{
	if(!profiles){res.status(404).json({notfound:"user not fuond"})
}
res.json(profiles)

	})
	.catch(err =>console.log("useranme error:"+err))
})


//@type GET
//@route /api/auth/find/user
//@desc route for everyprofile
//@access Public

router.delete('/', passport.authenticate('jwt',{session : false}),
	(req ,res) =>{

Profile.findOne({user :req.user.id})
profile.findOneAndRemove({user :req.user.id})
.then( () =>{
	Person.findOneAndRemove({_id:req.user.id})
	.then(() =>res.json({sucess :"deleated"}))
	.catch(err =>console.log(err))
}


	)
.catch(err =>console.log("chutia" +err))


}
)

router.post(
  "/workrole",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
  
Profile.findOne({user:req.user.id})
.then(profile =>{
//assigment
const wprk ={
	role:req.body.role,
	company:req.body.company,
	country:req.body.country,
	from:req.body.from,
	to:req.body.to,
};
profile.workrole.push(wprk);
profile.save()
.then(profile => res.json(profile))
.catch(err =>console.log(err))
})
.catch(err =>console.log(err))
  })

router.delete("/workrole/:w_id",passport.authenticate("jwt", { session: false }),
  (req, res) => {
  	Profile.findOne({user :req.user.id})
  	.then(profile =>{if(!profile)
  		{res.status(404).json({pro :"no profile"})}
  		else
  		{
  			const remw = profile.workrole.map(item =>item.id).indexOf(req.param.w_id);
  			profile.workrole.splice(remw , 1)

  			profile.save()
  			.then(profile =>{res.json(profile)})
  			.catch(err =>console.log(err))
  		}


  	}	)
  	.catch(err =>console.log(err))

  }
  )





module.exports = router;
