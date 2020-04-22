var express = require('express')

const router = express.Router()

router.get('/', (req ,res) => 

res.json( {public : "public router"})
module.exports = router