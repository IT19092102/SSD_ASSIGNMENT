const router = require('express').Router()
const messageCtrl = require('../controllers/messageController')
const auth = require('../middleware/auth')

router.post('/createMessage', messageCtrl.createMessage);


router.get('/allMessage',  messageCtrl.getAllMessage)



module.exports = router