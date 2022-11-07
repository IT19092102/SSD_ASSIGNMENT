const router = require('express').Router()
const fileCtrl = require('../controllers/fileController')
const auth = require('../middleware/auth')

router.post('/createFile', fileCtrl.createFile);


router.get('/allFile',  fileCtrl.getAllFile)



module.exports = router