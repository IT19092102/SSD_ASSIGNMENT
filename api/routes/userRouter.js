const router = require('express').Router()
const userCtrl = require('../controllers/userController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
router.post('/register', userCtrl.register);

router.post('/login', userCtrl.login);

router.get('/logout', userCtrl.logout);

 router.get('/refresh_token', userCtrl.refreshToken);

 router.get('/infor', auth,  userCtrl.getUser)

 router.get('/allUsers',   userCtrl.getAllUser)

 
 router.get('/authentication', auth,  userCtrl.getAllUser)
 

module.exports = router