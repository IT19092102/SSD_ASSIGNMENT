const router = require('express').Router()
const userCtrl = require('../controllers/userController')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')




router.post('/register', userCtrl.register);

router.post('/login', userCtrl.login);

router.get('/logout', userCtrl.logout);

 router.get('/refresh_token', userCtrl.refreshToken);

 router.get('/infor', auth,  userCtrl.getUser)

 router.get('/allUsers',   userCtrl.getAllUser)
 

//admin auth routes 

 router.post('/register-au', adminAuth, userCtrl.register);

 router.get('/authentication', adminAuth,  userCtrl.getAllUser)
 

module.exports = router