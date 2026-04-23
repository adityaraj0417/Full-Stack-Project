//express import 
const express = require('express') ;
const userController = require('../controllers/userController')
//express.Router()
const router = express.Router();
const passport = require('passport')
const upload = require('../middleware/upload')
const protect = require('../middleware/protect')

router.post('/register',userController.signUp) ;
router.post('/login',userController.login) ;
router.post('/update-profile', protect, upload.single('profilePic'), userController.updateProfile);

router.get('/auth/google' , passport.authenticate('google' , {scope : ['email' , 'profile']})) ;

router.get('/auth/google/callback' , passport.authenticate('google' , {failureRedirect : '/login' , session:false}),  userController.googleAuth
)
module.exports = router ;