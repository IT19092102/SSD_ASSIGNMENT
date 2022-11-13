const router = require('express').Router()
const messageCtrl = require('../controllers/messageController')
const workerAuth = require('../middleware/workerAuth')

router.post('/createMessage',workerAuth, messageCtrl.createMessage);


router.get('/allMessage',workerAuth,  messageCtrl.getAllMessage)



module.exports = router