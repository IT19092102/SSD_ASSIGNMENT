const router = require('express').Router()
const fileCtrl = require('../controllers/fileController')
const managerAuth = require('../middleware/managerAuth')

router.post('/createFile', fileCtrl.createFile);


router.get('/allFile', managerAuth, fileCtrl.getAllFile)



module.exports = router