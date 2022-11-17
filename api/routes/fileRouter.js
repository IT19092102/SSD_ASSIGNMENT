const router = require('express').Router()
const fileCtrl = require('../controllers/fileController')
const managerAuth = require('../middleware/managerAuth')

router.post('/createFile',managerAuth , fileCtrl.createFile);


router.get('/allFile', managerAuth, fileCtrl.getAllFile)



module.exports = router