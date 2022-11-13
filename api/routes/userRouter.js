const router = require('express').Router()
const userCtrl = require('../controllers/userController')
const adminAuth = require('../middleware/adminAuth')


router.post('/login', userCtrl.login);

router.get('/logout', userCtrl.logout);

router.get('/refresh_token', userCtrl.refreshToken);

// router.get('/infor', auth, userCtrl.getUser)


//admin auth routes 
router.get('/allUsers', adminAuth, userCtrl.getAllUser)

router.post('/register', adminAuth, userCtrl.register);


module.exports = router